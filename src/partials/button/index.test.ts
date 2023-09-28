import Router from "../../utils/Router.ts";
import Button from "./index.ts";
import { expect } from "chai";
import sinon from "sinon";

describe("Button компонент", () => {
    it("Создания кнопки", () => {
        const but = new Button({})
        const element = but.element;

        expect(element).to.be.instanceOf(window.HTMLButtonElement)
    })

    it("Переход на страницу, по нажатию на кнопку", () => {
        const but = new Button({events: {click: () => {Router.go("/")}}})
        const spy = sinon.spy(Router, "go")
        const element = but.element as HTMLSpanElement
        
        element.click()

        expect(spy.calledOnce).to.eq(true)
    })
})
