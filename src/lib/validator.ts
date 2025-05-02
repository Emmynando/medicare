class Validator {
  constructor() {}

  hasNonEmptyValues(obj: any) {
    const keys = Object.keys(obj);
    return Object.values(obj).every((value, index) => {
      if (keys[index] === "referral_link") {
        return true;
      } else {
        return (
          value ||
          (typeof value === "string" && (value as string).trim().length !== 0)
        );
      }
    });
  }

  validatebirthdate(birthday: string) {
    const birthdate = new Date(birthday);
    const today = new Date();
    // Zero out the time part for an accurate date-only comparison
    today.setHours(0, 0, 0, 0);

    if (birthdate < today) {
      return true;
    }
  }

  // validatePin(pin: string) {
  //   const isSixDigitsLong = pin?.length === 6;

  //   const isValidDigits = /^[0-9]+?$/.test(pin);
  //   if (!isSixDigitsLong) {
  //     return "Pin must be 6 digits";
  //   }
  //   if (!isValidDigits) {
  //     return "Pin must contain only numbers!";
  //   }
  // }

  // validatePassword(password: string) {
  //   const isAtLeastEightCharacters = password?.length >= 8;
  //   const alphabetsCount = password.replace(/[^a-zA-Z]/g, "")?.length;
  //   const numbersCount = password.replace(/[^0-9]/g, "")?.length;
  //   const symbolCount = password.replace(/[a-zA-Z0-9]/g, "")?.length;

  //   if (!isAtLeastEightCharacters) {
  //     return "Password must be at least 8 characters long";
  //   }

  //   if (alphabetsCount < 3) {
  //     return "Password must contain at least 3 alphabets";
  //   }

  //   if (numbersCount < 3) {
  //     return "Password must contain at least 3 numbers";
  //   }

  //   if (symbolCount < 1) {
  //     return "Passoword must contain at least one symbol";
  //   }
  // }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) return true;
  }

  validatePhoneNumber(number: string) {
    const regex = /^[0-9]{10}$/;
    if (regex.test(number) || number.length === 10) return true;
  }

  //   validate file type
  validateFileType(file: File): boolean {
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!(file instanceof File)) return false;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
      return false;
    }

    if (file.size > maxSize) {
      return false;
    }

    return true;
  }

  validateFileSize(file: File) {
    return file instanceof File && file.size <= 3 * 1024 * 1024;
  }

  atLeastOneValueNotEmpty(obj: any) {
    return Object.values(obj).some(
      (value: any) =>
        value !== null &&
        value !== undefined &&
        // !value &&
        value.toString().trim().length !== 0
    );
  }
}

export const validator = new Validator();

export default Validator;
