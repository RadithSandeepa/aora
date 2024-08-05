import { Client, Account, Databases, ID, Avatars, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.radithsandeepa.aora',
    projectId: '66ab2fd90032f9d4e3d7',
    databaseId: '66ab324a000e1074c9e4',
    userCollectionId: '66ab32ad0003b3097979',
    videoCollectionId: '66ab32f2003b049655e4',
    storageId: '66ab34c700199ac4a7d9'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),    
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        ); 

        return newUser;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }

}

export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
        return session;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const getAllPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )

        return posts.documents;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}