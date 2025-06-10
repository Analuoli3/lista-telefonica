import { StyleSheet, View, Alert, TextInput, Button} from 'react-native';
import{useState} from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';

export default function AddScreen({ navigation }){
    const db = SQLite.openDatabaseSync("contatos.sqlite");

    const[novoNome, setNovoNome] =useState<string>('');
    const[novoTelefone, setNovoTelefone] =useState<string>('');


    const adicionar = async() => {
        if(novoTelefone =="" || novoNome ==""){
        Alert.alert("Insira dados em todos os campos!")
        return;
        }

        await db.runAsync(`INSERT INTO contatos (nome, telefone) VALUES (?)`, novoNome, novoTelefone);

        setNovoTelefone('');
        setNovoNome('');

        await navigation.goBack();
    }

    return(
    <View>
        <TextInput
        value={novoNome}
        onChangeText={setNovoNome}
        placeholder="Digite o nome do contato..."
        placeholderTextColor="#555"
        />

        <TextInput
        value={novoTelefone}
        onChangeText={setNovoTelefone}
        placeholder="Digite o telefone do contato..."
        placeholderTextColor="#555"
        />

        <View>
        <Button onPress={adicionar} title='★ ADICIONAR CONTATO ★' color="pink" />
        </View>
    </View>
    );
}
