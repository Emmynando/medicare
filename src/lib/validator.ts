class Validator {
  constructor() {}

  //@ts-ignore
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
