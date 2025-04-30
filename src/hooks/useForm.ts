"use client";
import { ChangeEvent, useState } from "react";

const useForm = <IFormData>(InitialData: IFormData) => {
  const [formData, setFormData] = useState<IFormData>(InitialData);
  const [mediaPreview, setMediaPreview] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!event?.target) {
      console.error("Event target is undefined:", event);
      return;
    }
    const { name, value, type } = event?.target;
    const files = (<HTMLInputElement>event.target).files;

    if (type === "file") {
      if (files) {
        // if (formData[name as keyof typeof formData])
        setFormData((prevState) => {
          return { ...prevState, [name]: files[0] };
        });
        setMediaPreview(window.URL.createObjectURL(files[0]));
      }
    } else {
      setFormData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  return { mediaPreview, setMediaPreview, formData, setFormData, handleChange };
};

export default useForm;
