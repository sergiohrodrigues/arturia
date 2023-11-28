import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface Item {
    codigo: number;
    descricao: string;
    preco: number;
}

interface Usuario {
    usuario: string;
}

interface MeuBancoDeDados extends DBSchema {
    itens: {
        value: Item;
        key: number;
        autoIncrement: true;
    };
    usuario: {
        value: Usuario;
        key: number;
        autoIncrement: true;
    };
}

export async function inicializarBancoDeDados(): Promise<IDBPDatabase<MeuBancoDeDados>> {
    const db = await openDB<MeuBancoDeDados>('MyDataBase', 1, {
        upgrade(db) {
            db.createObjectStore('itens', { keyPath: 'codigo', autoIncrement: true });
            db.createObjectStore('usuario', { keyPath: 'id', autoIncrement: true });
        },
    });

    const itensCount = await db.count('itens');

    const descricao = ['Shoulder Riddel', 'Bola Futebol Americano', 'Protetor Bocal', 'Luvas de Futebol Americano', 'Chuteira Under Armour', 'Protetor de Costas', 'Calça Elástica', 'Camiseta Chiefs', 'Camiseta Buffalo Bills', 'Bola Futebol Americano'];

    if (itensCount === 0) {
        await db.clear('itens');

        for (let i = 0; i < 10; i++) {
            const item = {
                codigo: i + 1,
                descricao: descricao[i],
                preco: Math.floor(Math.random() * (250 - 100 + 1)) + 100,
            };
            await db.add('itens', item);
        }
    }

    const usuarioCount = await db.count('usuario');

    if (usuarioCount === 0) {
        const usuario = {
            usuario: 'Willian'
        };
        await db.add('usuario', usuario);
    }

    
    return db;
}