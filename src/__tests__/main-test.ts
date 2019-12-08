import main from "../main";

test("is ok?", () => {
  expect(new main("").testFun()).toBe("is ok");
})