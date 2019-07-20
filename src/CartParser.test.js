import CartParser from './CartParser';
import expect from "expect.js"


let parser;
let cart;

beforeEach(() => {
    parser = new CartParser();
    cart = "Product name,Price,Quantity\n" +
        "Mollis consequat,9.00,2\n" +
        "Tvoluptatem,10.32,1\n" +
        "Scelerisque lacinia,18.90,1\n" +
        "Consectetur adipiscing,28.72,10\n" +
        "Condimentum aliquet,13.90,1";
});


describe('CartParser - unit tests', () => {

    describe("validate tests", () => {

        it("should return an empty array when there are no errors", () => {
            expect(parser.validate(cart)).to.be.empty();
        });

        it("should return an array with three objects when three errors in the header", () => {
            expect(parser.validate("Product name Price Quantity")).to.have.length(3);
        });

        it("should return an array of an object with errors when there are few cells in a row", () => {
            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                "Mollis consequat,9.00\n")[0]).to.have.property('type', 'row');

            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                "Mollis consequat\n")[0]).to.have.property('type', 'row');

        });

        it("should return an array with object when cell is empty", () => {
            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                ", ,")[0]).to.have.property('type', 'cell');
        });

        it("should return an array with object cell is string | - number | NaN? ", () => {
            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                "Mollis consequat,9.00,a\n")[0]).to.have.property('type', 'cell');

            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                "Mollis consequat,9.00,-5")[0]).to.have.property('type', 'cell');

            expect(parser.validate(
                "Product name, Price, Quantity\n" +
                "Mollis consequat,9.00," + NaN)[0]).to.have.property('type', 'cell');


        });

    });

    describe("parseLine tests", () => {
        it("should return an object", () => {
            expect(parser.parseLine("Tvoluptatem,10.32,1")).to.only.have.keys(['name', "price", "id", "quantity"])
        });

        it("ParseLine", () => {
            expect(parser.parseLine("Tvoluptatem,10.32,10")).to.only.have.property("quantity", 10)
        })
    })
})


describe('CartParser - integration test', () => {
    describe("parse tests", () => {
        const readFile = jest.fn();
        // expect(parser.readFile("../samples/cart.csv")).to.be.empty()
    });
})