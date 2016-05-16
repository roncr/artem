import foo from './foo';

describe("foo", function() {
  it("should returns the answer to the ultimate question of life, the universe, and everything.", function() {
    expect(foo()).toEqual(42);
  });
});
