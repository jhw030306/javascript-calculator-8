import { Console } from "@woowacourse/mission-utils";

// 문자열 입력받기
class InputHandle {
  async InputValue() {
    const getValue = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. \n "
    );

    return getValue;
  }
}

// 커스텀구분자
// class SeparateHandler {
//   CustomSeperate(getValue) {
//     if (getValue.startsWith("//")) {
//       const customSeperator = getValue.split("\n");
//       Console.print(`특수문자 ${customSeperator}`);
//     }
//   }
// }

// 구분자로 문자 구분
class SplitHandler {
  StringSplit(getValue) {
    const splitValue = getValue.split(/,|;/);

    var splitValueNumber = splitValue.map(Number);
    try {
      for (let i = 0; i < splitValueNumber.length; i++) {
        if (isNaN(splitValue[i]))
          throw new Error(
            "[ERROR] 양수와 구분자가 아닙니다."
          );
      }
    } catch (e) {
      Console.print(e.message);
      return;
    }

    let sum = 0;

    for (let i = 0; i < splitValueNumber.length; i++) {
      sum += splitValueNumber[i];
    }

    Console.print(`결과 : ${sum}`);
  }
}

class App {
  async run() {
    const inputhandle = new InputHandle();
    const splithander = new SplitHandler();
    const getValue = await inputhandle.InputValue();
    splithander.StringSplit(getValue);
  }
}

export default App;
