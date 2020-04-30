function quickStart(arr) {
  let num = 0
  num++
  console.log(num, 'num')
  if (arr.length < 2) {
    return arr
  }
  const target = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < target) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickStart(left).concat([target], quickStart(right))
}

function quickStart2(arr, start, end) {
  if (end - start < 1) {
    return
  }
  const target = arr[start]
  let l = start,
    r = end
  while (l < r) {
    while (l < r && arr[r] >= target) {
      r--
    }
    arr[l] = arr[r]
    while (l < r && arr[l] < target) {
      l++
    }
    arr[r] = arr[l]
  }
  arr[l] = target
  quickStart2(arr, start, l - 1)
  quickStart2(arr, l + 1, end)
  return arr
}

let arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]
console.log(quickStart2(arr,0,arr.length-1))
