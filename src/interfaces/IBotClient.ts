export default interface IBotClient {
    botToken: string;
    language: string;

    Init(): void;
    LoadHandlers(): void;
}