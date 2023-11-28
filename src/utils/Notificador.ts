import { type INotificacao, type TipoNotificacao } from "../interfaces/INotificacao";
import { useStore } from "../stores/store";

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default (): Notificador => {

    const store = useStore();

    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        const notificacao = {
            titulo,
            texto,
            tipo
        } as INotificacao

        store.notificar(notificacao)
    }

    return {
        notificar
    }

}