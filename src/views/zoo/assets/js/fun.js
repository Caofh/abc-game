

function orientation () {
  let windowStatus = false

  if(window.orientation == 90|| window.orientation == -90){
    windowStatus = true
  }

  return windowStatus
}





export {
  orientation
}