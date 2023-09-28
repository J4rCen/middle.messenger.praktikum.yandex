import { expect } from "chai";
import Router, {BlockConstructable} from "./Router.ts";
import sinon from "sinon";

describe("Router", () => {

    beforeEach(() => {
        Router.reset()
    })

    const getContentFake = sinon.fake.returns(document.createElement("div"));

    const BlockMock = class {
        getContent = getContentFake;
    } as unknown as BlockConstructable;

    it("use должен вернуть Router", () => {
        const result = Router.use("/", BlockMock);
        expect(result).to.eq(Router)
    })

    describe("Метод back", () => {
        // getContentFake()

        it("Отображения страницы после возрата истории", () => {
            Router.use("/", BlockMock).start()
            Router.back()
            
            expect(getContentFake.callCount).to.eq(1)
            
        })

        it("Отображения страницы при запуски", () => {
            Router.use('/', BlockMock).start()

            expect(getContentFake.callCount).to.eq(1)
        })
    })

    describe("Метод forward", () => {
        it("Переход на одну страницу в перед", () => {
            const forwardSpy = sinon.spy(global.window.history, "forward")
            Router.forward()

            expect(forwardSpy.callCount).to.eq(1)
        })
    })

    describe("Метод go", () => {
        it("Переход на другю страницу", () => {
            Router.use("/", BlockMock).use("/login", BlockMock).start()
            Router.go("/login")

            expect(window.location.pathname).to.eq("/login")
        })
    })
})