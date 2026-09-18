import { test, expect } from '@playwright/test';
test('personalized library exposes Paper Pool, Quick Read, reports and Daily Archive', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '材料性质预测' })).toBeVisible();
  await expect(page.locator('.eyebrow')).toContainText('研究知识库 ·');
  await expect(page.locator('.hero-subtitle')).toHaveText('研究知识库');
  await expect(page.locator('.hero .lede')).toHaveText(
    '围绕材料性质预测，整理模型、数据、评测方法与可复现证据。',
  );
  await expect(page.getByRole('heading', { name: '今日论文' })).toBeVisible();

  await page.getByRole('link', { name: '论文池', exact: true }).click();
  await expect(page.getByRole('heading', { name: '论文池' })).toBeVisible();
  const todayPaper = page.getByRole('link', {
    name: 'Optimal pre-train/fine-tune strategies for accurate material property predictions',
  });
  await expect(todayPaper).toBeVisible();
  await todayPaper.click();

  await expect(page.getByRole('heading', { name: '快速阅读' })).toBeVisible();
  await expect(
    page.locator('.quick-read p').filter({ hasText: /论文用 ALIGNN 比较/ }),
  ).toBeVisible();
  await page.getByRole('button', { name: '阅读详情 ↓' }).click();
  await expect(page.getByRole('heading', { name: '核心方法', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '论文贡献 / Contributions' })).toBeVisible();

  await page.getByRole('link', { name: '每日归档', exact: true }).click();
  await expect(page.getByRole('heading', { name: '每日归档' })).toBeVisible();
  await expect(page.getByText('2026-09-16')).toBeVisible();
  await expect(todayPaper).toBeVisible();
});
test('hero title wraps long text without overflowing at desktop and mobile widths', async ({
  page,
}) => {
  await page.goto('/');
  const heroTitle = page.locator('.hero h1');
  await heroTitle.evaluate((element) => {
    element.textContent =
      'A deliberately long research library title that should wrap naturally to fit the available content width without creating horizontal overflow';
  });

  for (const width of [1440, 1024, 390]) {
    await page.setViewportSize({ width, height: 800 });
    const metrics = await heroTitle.evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const lineTops = new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top)));
      const titleBounds = element.getBoundingClientRect();
      return {
        whiteSpace: getComputedStyle(element).whiteSpace,
        lineCount: lineTops.size,
        titleOverflows: element.scrollWidth > element.clientWidth + 1,
        titleOutsideViewport: titleBounds.left < -1 || titleBounds.right > window.innerWidth + 1,
      };
    });

    expect(metrics.whiteSpace).not.toBe('nowrap');
    expect(metrics.lineCount).toBeGreaterThan(1);
    expect(metrics.titleOverflows).toBe(false);
    expect(metrics.titleOutsideViewport).toBe(false);
  }
});
