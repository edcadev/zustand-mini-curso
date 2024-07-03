import { createJSONStorage, type StateStorage } from "zustand/middleware";

const firebaseURL = "https://zustand-storage-4e344-default-rtdb.firebaseio.com/zustand";

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then((res) => res.json());
      return JSON.stringify(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseURL}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
