export class Node {
  constructor(value, leftChild, rightChild) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

export class Tree {
  constructor(root) {
    this.root = root;
  }
}
