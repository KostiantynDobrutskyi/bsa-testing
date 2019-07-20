import CartParser from './CartParser';

let parser;
let cart = "Product name,Price,Quantity\n" +
    "Mollis consequat,9.00,2\n" +
    "Tvoluptatem,10.32,1\n" +
    "Scelerisque lacinia,18.90,1\n" +
    "Consectetur adipiscing,28.72,10\n" +
    "Condimentum aliquet,13.90,1";

beforeEach(() => {
    parser = new CartParser();
});

describe('CartParser - unit tests', () => {
    // Add your unit tests here.
    it("Validate", () => {
        expect(parser.validate(cart)).toEqual([]);
        expect(parser.validate("Product name Price Quantity")).toHaveLength(3);
        expect(parser.validate(
            "Product name, Price Quantity\n" +
            "Mollis consequat,9.00,a\n")).toHaveLength(3);

        expect(parser.validate(
            "Product name, Price, Quantity\n" +
            "9.00, 2\n")).toHaveLength(1);


    })
});

describe('CartParser - integration test', () => {
    // Add your integration test here.
});