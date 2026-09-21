import { test, expect } from '@playwright/test';

test.describe('Visitor & Lead Capture Journey', () => {
  test('navigates from homepage to for-sale listings and filters properties', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Haven Crest Real Estate/);

    // Click 'For Sale' or browse
    await page.click('text=View All Properties For Sale');
    await expect(page).toHaveURL(/\/buy/);

    // Verify property cards are rendered
    const cards = page.locator('text=Guide Price');
    await expect(cards.first()).toBeVisible();
  });

  test('opens property detail and submits viewing request', async ({ page }) => {
    await page.goto('/buy');
    await page.click('text=View Residence');
    await expect(page).toHaveURL(/\/property\//);

    // Open schedule viewing modal
    await page.click('text=Schedule Private Viewing');
    await expect(page.locator('text=Confirm Private Viewing Itinerary')).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', 'David Kimani');
    await page.fill('input[name="phone"]', '+254 712 345 678');
    await page.click('text=Confirm Private Viewing Itinerary');

    // Expect confirmation
    await expect(page.locator('text=Viewing Request Received')).toBeVisible();
  });
});

test.describe('Agent & Admin Moderation Journey', () => {
  test('agent creates listing and admin approves it', async ({ page }) => {
    // Navigate directly to agent new listing
    await page.goto('/agent/listings/new');
    await expect(page.locator('text=Draft New Luxury Listing')).toBeVisible();

    await page.fill('input[name="title"]', 'The Amber Horizon Penthouse');
    await page.fill('input[name="price"]', '125000000');
    await page.selectOption('select[name="neighborhood_id"]', { index: 1 });
    await page.fill('input[name="address"]', 'Riverside Park Drive, Nairobi');
    await page.fill('textarea[name="description"]', 'A dramatic triplex penthouse with floor-to-ceiling glass and skyline river views.');
    await page.click('text=Submit for Admin Moderation');

    // Verify redirected to agent listings
    await expect(page).toHaveURL(/\/agent\/listings/);

    // Navigate to admin listings moderation queue
    await page.goto('/admin/listings');
    await expect(page.locator('text=Listings Moderation & Governance')).toBeVisible();
    await expect(page.locator('text=The Amber Horizon Penthouse')).toBeVisible();

    // Approve listing
    await page.click('text=Publish');
    await expect(page.locator('text=Published')).toBeVisible();
  });
});
