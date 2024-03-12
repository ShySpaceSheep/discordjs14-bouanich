export default interface IBotClient {
    botToken: string;

    Init(): void;
    LoadHandlers(): void;
}