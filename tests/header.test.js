const Page = require("./helpers/page");

let page;

beforeEach( async() =>{
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach ( async () =>{
  await page.close();
});

it("the logo has the correct text", async () =>{
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

it("clicking login starts oauth flow", async () =>{
  await page.click(".right a");

  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

it("When signed in, shows logout button", async () =>{
  //const id = "5e89834c6fc08732ad79701a";
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual("Logout");
});

