function bubbleSort(arr) {
  
  for (let j = 0; j < arr.length; j++) {
    console.log('111')
    let complete = true
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        complete = false
      }
    }
    if (complete) {
      break
    }
  }
  return arr
}
let arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]
console.log(bubbleSort(arr))
