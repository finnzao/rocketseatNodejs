export class Slug {
    public value: string

    constructor(value: string) {
        this.value = value
    }
    /**
     * Receives a string and normalize it as a slug.
     *
     * Example: "An example title" => "an-example-title"
     *
     * @param text {string}
     */
    static createFqUAromText(text: string) {
        const slugText = text.normalize("NFKD")
    }
}