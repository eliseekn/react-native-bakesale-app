export type DealType = {
    key: string
    title: string
    price: number
    cause: {name: string}
    media: string[]
    user: {avatar: string; name: string}
    description: string
}

export type RootStackParamList = {
    Home: undefined
    Details: {dealKey: string}
}
