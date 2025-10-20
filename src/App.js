import { Console } from "@woowacourse/mission-utils";

// 문자열 입력받기
class InputHandler {
  async InputValue() {
    const getValue = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. \n "
    );

    return getValue;
  }
}

// 커스텀 문자열 추출
class CustomerHandler {
  CustmoerStringSplit(getValue) {
    if (getValue.startsWith("//")) {
      const customSeperate = getValue.split("\\n");
      const customSeperator = customSeperate[0].slice(2);

      const regExp = /[~!@#$%^&*()_+|~=, ]/;
      try {
        if (!regExp.test(customSeperator)) {
          throw new Error("[ERROR] 올바른 구분자가 아닙니다.");
        } else if (customSeperator.length !== 1)
          throw new Error("[ERROR] 올바른 입력값이 아닙니다.");
      } catch (e) {
        Console.print(e.message);
        return null;
      }

      return { customSeperator, customSeperate };
    }
    return getValue;
  }
}

// 구분자로 문자 구분
class SplitHandler {
  StringSplit(getValue, customSeperate, customSeperator) {
    let splitValue;

    if (customSeperator) {
      // const customSeperator = customSeperate[0].slice(2);
      splitValue = customSeperate[1].split(customSeperator);
    } else {
      splitValue = getValue.split(/,|:/);
    }

    const splitValueNumber = splitValue.map((Number) =>
      Math.abs(Number.trim())
    );

    try {
      for (let i = 0; i < splitValueNumber.length; i++) {
        if (isNaN(splitValueNumber[i]))
          throw new Error("[ERROR] 올바른 입력값이 아닙니다.");
      }
    } catch (e) {
      Console.print(e.message);

      return null;
    }
    return splitValueNumber;
  }
}

// 구분된 숫자 계산
class CalculatorHandler {
  ValueCalculator(splitValueNumber) {
    let sum = 0;

    for (let i = 0; i < splitValueNumber.length; i++) {
      sum += splitValueNumber[i];
    }

    Console.print(`결과 : ${sum}`);
  }
}

class App {
  async run() {
    const inputhandler = new InputHandler();
    const customerhandler = new CustomerHandler();
    const splithander = new SplitHandler();
    const calculatorhandler = new CalculatorHandler();

    const getValue = await inputhandler.InputValue();

    const result = customerhandler.CustmoerStringSplit(getValue);
    if (result === null) {
      return;
    }

    const { customSeperator, customSeperate } = result;

    const splitValueNumber = splithander.StringSplit(
      getValue,
      customSeperate,
      customSeperator
    );
    if (splitValueNumber === null) {
      return;
    }
    calculatorhandler.ValueCalculator(splitValueNumber);
  }
}

export default App;
