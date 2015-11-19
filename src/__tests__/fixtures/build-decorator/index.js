
function testable(target) {
  target.isTestable = true;
}

@testable
class A {}

console.log(A.testable);
