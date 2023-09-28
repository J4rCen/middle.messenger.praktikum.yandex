import Input from "./index.ts";
import { expect } from "chai";

describe("Input компонент", () => {
    it("Создания input компонента", () => {
        const input = new Input({name: "test", class: "test"})
        const element = input.element;

        expect(element).to.be.instanceOf(window.HTMLInputElement)
    })

    it("Чтение значений из input-а", () => {
        const input = new Input({name: "test", class: "test"});
        (input as Input).setValue("test")

        expect(input.getValue()).to.eq("test")
    })
})
