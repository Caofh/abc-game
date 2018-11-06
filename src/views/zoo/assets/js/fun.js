
// 判断当前是否为横屏
function orientation () {
  let windowStatus = false

  if(window.orientation == 90|| window.orientation == -90){
    windowStatus = true
  }

  return windowStatus
}

// 各个关卡配置映射表
/*
5s内选出正确动物（动物数10）；  5s内选出正确动物（动物数10）；  5s内选出正确动物（动物数20）；  5s内选出正确动物（动物数20）；
5s内选出正确动物（动物数24）；  5s内选出正确动物（动物数24）；  3s内选出正确动物（动物数20）；  3s内选出正确动物（动物数20）；
3s内选出正确动物（动物数24）；  3s内选出正确动物（动物数24）；  2s内选出正确动物（动物数24）；  1s内选出正确动物（动物数24）；
 */
function checkpoint (progress) {
  const num = parseInt(progress)
  let animalCount = ''
  let second = ''

  switch (num) {
    case (1): animalCount = 10; second = 5; break;
    case (2): animalCount = 10; second = 5; break;
    case (3): animalCount = 10; second = 5; break;
    case (4): animalCount = 10; second = 5; break;
    case (5): animalCount = 10; second = 5; break;
    case (6): animalCount = 10; second = 3; break;
    case (7): animalCount = 10; second = 3; break;
    case (8): animalCount = 10; second = 3; break;
    case (9): animalCount = 10; second = 3; break;
    case (10): animalCount = 10; second = 3; break;
    case (11): animalCount = 18; second = 2; break;
    case (12): animalCount = 18; second = 1; break;
  }

  return {
    animalCount,
    second
  }

}

// 动物名称与图片的映射关系(num：图片名称后缀数字，theme：当前主题)
function animalNameList (num, theme) {
  const index = parseInt(num)
  let name = ''

  if (theme == 1) {
    switch (index) {
      case (1): name = 'Cattle'; break;
      case (2): name = 'Deer'; break;
      case (3): name = 'Lion'; break;
      case (4): name = 'Panda'; break;
      case (5): name = 'Cattle'; break;
      case (6): name = 'Dog'; break;
      case (7): name = 'Horse'; break;
      case (8): name = 'Dolphin'; break;
      case (9): name = 'Rabbit'; break;
      case (10): name = 'Monkey'; break;
      case (11): name = 'Fox'; break;
      case (12): name = 'Donkey'; break;
      case (13): name = 'Pig'; break;
      case (14): name = 'Fish'; break;
      case (15): name = 'Butterfly'; break;
      case (16): name = 'Koala'; break;
      case (17): name = 'Cat'; break;
      case (18): name = 'Sheep'; break;
      case (19): name = 'Bear'; break;
      case (20): name = 'Giraffe'; break;
    }
  } else if (theme == 2) {
    switch (index) {
      case (1): name = 'Elephant'; break;
      case (2): name = 'Tortoise'; break;
      case (3): name = 'Snake'; break;
      case (4): name = 'Crane'; break;
      case (5): name = 'Strawberry'; break;
      case (6): name = 'Cucumber'; break;
      case (7): name = 'Eggplant'; break;
      case (8): name = 'Potato'; break;
      case (9): name = 'Lemon'; break;
      case (10): name = 'Chestnut'; break;
      case (11): name = 'Pear'; break;
      case (12): name = 'Coconut'; break;
      case (13): name = 'Cherry'; break;
      case (14): name = 'Orange'; break;
      case (15): name = 'Beef'; break;
      case (16): name = 'Mango'; break;
      case (17): name = 'Grape'; break;
      case (18): name = 'Watermelon'; break;
      case (19): name = 'Banana'; break;
      case (20): name = 'Banana'; break;
    }
  }

  return name

}


export {
  orientation,
  checkpoint,
  animalNameList
}