export class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(root = null) {
    this.root = root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value, node = this.root) {
    if (!node) return false;

    if (value === node.value) return true;

    if (value < node.value) {
      return this.includes(value, node.left);
    }

    return this.includes(value, node.right);
  }

  insert(value) {
    this.root = this.#insertRec(value, this.root);
  }

  #insertRec(value, node) {
    if (!node) return new Node(value);

    if (value === node.value) {
      return node; // ignore doublon
    }

    if (value < node.value) {
      node.left = this.#insertRec(value, node.left);
    } else {
      node.right = this.#insertRec(value, node.right);
    }

    return node;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) curr = curr.left;
    return curr;
  }

  deleteItem(root, x) {
    if (root === null) return root;

    if (root.value > x) {
      root.left = this.deleteItem(root.left, x);
    } else if (root.value < x) {
      root.right = this.deleteItem(root.right, x);
    } else {
      // Node with 0 or 1 child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Node with 2 children
      const succ = this.getSuccessor(root);
      root.value = succ.value;
      root.right = this.deleteItem(root.right, succ.value);
    }

    return root;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback is required");
    }

    if (!this.root) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      callback(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }

    if (node === null) return;

    callback(node.value);

    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }

    if (node === null) return;

    this.inOrderForEach(callback, node.left);

    callback(node.value);

    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }

    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);

    callback(node.value);
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const randomArr = generateRandomArray();

function buildTree(array) {
  const uniqueArray = [...new Set(array)];
  const sortedArray = uniqueArray.toSorted((a, b) => a - b);

  const root = sortedArrayToBSTRecur(sortedArray, 0, sortedArray.length - 1);

  return new Tree(root);
}

function sortedArrayToBSTRecur(array, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(array[mid]);

  root.left = sortedArrayToBSTRecur(array, start, mid - 1);
  root.right = sortedArrayToBSTRecur(array, mid + 1, end);

  return root;
}

function generateRandomArray() {
  const length = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  const array = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 10001);
    array.push(randomNumber);
  }

  return array;
}

const tree = buildTree(arr);
console.log(tree.prettyPrint());
tree.insert(50);
tree.root = tree.deleteItem(tree.root, 23);
tree.root = tree.postOrderForEach(console.log);
