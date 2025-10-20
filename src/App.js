import { Console } from "@woowacourse/mission-utils";

// 에러 처리
class StringCalculatorError extends Error {
  constructor(message) {
    // [ERROR] 문자열 포함하여 메시지 설정
    super(`[ERROR] ${message}`);
    this.name = "StringCalculatorError";
  }
}

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
  CustomerStringSplit(getValue) {
    if (getValue.startsWith("//")) {
      const customSeparate = getValue.split("\\n");
      const customSeparator = customSeparate[0].slice(2);
      if (customSeparate.length < 2) {
        throw new StringCalculatorError("입력 형식이 올바르지 않습니다.");
      }

      if (customSeparator.length !== 1) {
        throw new StringCalculatorError("올바른 입력값이 아닙니다.");
      }

      return { customSeparator, customSeparate };
    }
    return getValue;
  }
}

// 구분자로 문자 구분
class SplitHandler {
  StringSplit(getValue, customSeparate, customSeparator) {
    let splitValue;

    if (customSeparator) {
      splitValue = customSeparate[1].split(customSeparator);
    } else {
      splitValue = getValue.split(/,|:/);
    }

    const splitValueNumber = splitValue.map((numStr) => {
      if (numStr.trim() === "") {
        return 0;
      }

      const num = Number(numStr);

      if (isNaN(num)) {
        throw new StringCalculatorError("올바른 입력값이 아닙니다.");
      }

      if (num < 0) {
        throw new StringCalculatorError("음수는 입력할 수 없습니다.");
      }

      return num;
    });
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
    const inputHandler = new InputHandler();
    const customerHandler = new CustomerHandler();
    const splitHandler = new SplitHandler();
    const calculatorHandler = new CalculatorHandler();

    const getValue = await inputHandler.InputValue();

    if (getValue === "") {
      Console.print("결과 : 0");
      return;
    }

    const result = customerHandler.CustomerStringSplit(getValue);

    let customSeparator;
    let customSeparate;

    if (typeof result === "object" && result !== null) {
      ({ customSeparator, customSeparate } = result);
    }

    const splitValueNumber = splitHandler.StringSplit(
      getValue,
      customSeparate,
      customSeparator
    );

    calculatorHandler.ValueCalculator(splitValueNumber);
  }
}

export default App;
