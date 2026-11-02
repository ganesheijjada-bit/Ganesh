import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

const email = "eijjadaganeshvenkata@gmail.com";

test("the production page loads its identity and sections without browser errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const failedRequests = [];
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  await page.goto("/");
  await expect(page).toHaveTitle(/Ganesh Eijjada/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ganesh Eijjada",
  );
  await expect(page.locator(".hero-description")).toContainText(
    "Senior Java Full Stack Developer",
  );
  await expect(page.locator("main > section")).toHaveCount(5);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("link", { name: "Start a conversation" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

for (const name of ["AT&T Business Ready", "Intuit Financial Services"]) {
  test(`${name} opens a factual detail dialog with keyboard focus restoration`, async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", {
      name: `View ${name} project details`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText("THE CHALLENGE", { exact: true }),
    ).toBeVisible();
    await expect(
      dialog.getByText("KEY CONTRIBUTIONS", { exact: true }),
    ).toBeAttached();
    await expect(dialog.locator("li")).toHaveCount(6);
    await expect(
      dialog.getByRole("button", { name: "Close project details" }),
    ).toBeFocused();
    // The native modal must keep reverse keyboard traversal inside the story.
    await page.keyboard.press("Shift+Tab");
    await expect(
      dialog.getByRole("button", { name: "Back to selected work" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    // The explicit return action must also close the story.
    await trigger.click();
    await dialog.getByRole("button", { name: "Back to selected work" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
}

test("the experience ledger opens the selected role and collapses other roles", async ({
  page,
}) => {
  await page.goto("/");
  const roles = page.locator(".experience-toggle");
  await expect(roles).toHaveCount(4);
  await expect(roles.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#experience-panel-0")).toBeVisible();
  await roles.nth(1).click();
  await expect(roles.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#experience-panel-1")).toBeVisible();
  await expect(page.locator("#experience-panel-1")).toContainText(
    "Spring Boot",
  );
  await expect(page.locator("#experience-panel-0")).toBeHidden();
  await roles.nth(1).click();
  await expect(roles.nth(1)).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#experience-panel-1")).toBeHidden();
  await roles.nth(3).click();
  await expect(page.locator("#experience-panel-3")).toContainText("serverless");
});

test("the developer profile updates the selected stack and its context", async ({
  page,
}) => {
  await page.goto("/");
  const stack = page.getByRole("group", { name: "Explore my stack" });
  const reactLayer = stack.getByRole("button", { name: "React", exact: true });
  const aiLayer = stack.getByRole("button", {
    name: "Applied AI",
    exact: true,
  });
  const javaLayer = stack.getByRole("button", { name: "Java", exact: true });
  await expect(reactLayer).toHaveAttribute("aria-pressed", "true");
  await aiLayer.click();
  await expect(aiLayer).toHaveAttribute("aria-pressed", "true");
  await expect(reactLayer).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".developer-context")).toContainText(
    "Grounding AI answers in relevant knowledge and real product information.",
  );
  await expect(page.locator(".developer-code")).toContainText(
    '["RAG", "LangGraph"]',
  );
  await javaLayer.click();
  await expect(javaLayer).toHaveAttribute("aria-pressed", "true");
  await expect(aiLayer).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".developer-context")).toContainText(
    "Connecting services, data, and the business logic behind the experience.",
  );
  await expect(page.locator(".developer-code")).toContainText(
    '["Java", "Spring"]',
  );
});

test("the résumé link downloads the supplied nonempty DOCX", async ({
  page,
}) => {
  await page.goto("/");
  const downloaded = page.waitForEvent("download");
  await page.getByRole("link", { name: "Résumé", exact: true }).click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toBe("Ganesh-Eijjada-Resume.docx");
  const bytes = await readFile(await download.path());
  expect(bytes.length).toBeGreaterThan(30000);
  expect(bytes.subarray(0, 2).toString()).toBe("PK");
  const expected = await readFile(
    new URL("../public/Ganesh-Eijjada-Resume.docx", import.meta.url),
  );
  expect(bytes.equals(expected)).toBe(true);
});

test("contact links target the résumé email and copying gives success feedback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copiedPortfolioEmail = text;
        },
      },
    });
  });
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Start a conversation" }),
  ).toHaveAttribute("href", `mailto:${email}`);
  await expect(
    page.getByRole("link", { name: email, exact: true }),
  ).toHaveAttribute("href", `mailto:${email}`);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied.");
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.copiedPortfolioEmail)).toBe(email);
});

test("clipboard denial leaves a useful manual copy instruction", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard permission denied");
        },
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Please select and copy the email address above.",
  );
  await expect(
    page.getByRole("link", { name: email, exact: true }),
  ).toBeVisible();
});

test("mobile navigation opens, closes with Escape, and closes after choosing a section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(nav).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await nav.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(nav).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

for (const width of [320, 390, 768, 1440]) {
  test(`the ${width}px layout fits the viewport and reveals its main content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const id of ["work", "about", "experience", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const heading = page.locator(`#${id} h2`).first();
      await expect(heading).toBeVisible();
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

test("reduced motion disables continuous animation and keeps all reveals readable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".code-cursor")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".navy-flow-track > span")).toHaveCSS(
    "animation-name",
    "none",
  );
  const unreadableReveals = await page
    .locator("[data-reveal]")
    .evaluateAll(
      (elements) =>
        elements.filter((element) => getComputedStyle(element).opacity !== "1")
          .length,
    );
  expect(unreadableReveals).toBe(0);
});

test("visitors can pause and resume the decorative motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Resume animations", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute(
    "data-motion-paused",
    "true",
  );
  await expect(page.locator(".code-cursor")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await expect(page.locator(".navy-flow-track > span")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Pause animations", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".code-cursor")).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await expect(page.locator(".navy-flow-track > span")).toHaveCSS(
    "animation-play-state",
    "running",
  );
});

test("the navy theme keeps the identity and mint primary action legible", async ({
  page,
}) => {
  await page.goto("/");
  const colors = await page.evaluate(() => {
    const rgb = (color) =>
      color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number);
    const luminance = (channels) =>
      channels
        .map((value) => {
          const channel = value / 255;
          return channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
        })
        .reduce(
          (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
          0,
        );
    const contrast = (one, two) => {
      const values = [luminance(one), luminance(two)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const background = rgb(
      getComputedStyle(document.documentElement).backgroundColor,
    );
    const heading = rgb(getComputedStyle(document.querySelector("h1")).color);
    const button = getComputedStyle(
      document.querySelector(".hero-actions .button-primary"),
    );
    const actionBackground = rgb(button.backgroundColor);
    return {
      background,
      actionBackground,
      backgroundLuminance: luminance(background),
      identityContrast: contrast(background, heading),
      actionContrast: contrast(actionBackground, rgb(button.color)),
    };
  });
  expect(colors.backgroundLuminance).toBeLessThan(0.03);
  expect(colors.background[2]).toBeGreaterThan(colors.background[0]);
  expect(colors.actionBackground[1]).toBeGreaterThan(
    colors.actionBackground[0],
  );
  expect(colors.actionBackground[2]).toBeGreaterThan(
    colors.actionBackground[0],
  );
  expect(colors.identityContrast).toBeGreaterThanOrEqual(7);
  expect(colors.actionContrast).toBeGreaterThanOrEqual(4.5);
});
