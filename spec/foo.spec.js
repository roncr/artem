var tape = require("tape"),
    foo = require("../");

describe("foo", function() {
  it("should returns the answer to the ultimate question of life, the universe, and everything.", function() {
    expect(foo.foo()).toEqual(42);
  });
});
