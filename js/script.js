

const {createApp} = Vue

createApp ({
    data() {
        return {
            dateOptions: {},
            newMessage:'',
            newMessageDate: null,
            chatToShow: null,
            searchField: '',
            originalContacts: [],
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_5.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: false,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    mounted() {
        this.dateFormat('hour-minute');
        this.initialDateParsing();
        this.contactsCopy();
    },
    methods: {
        showChat(i) {
            if (this.chatToShow == null) {
                this.contacts[i].visible = true;
                this.chatToShow = i;    
            } else if (this.chatToShow == i) {
                this.contacts[this.chatToShow].visible = false;
                this.chatToShow = null;
            }else {
                this.contacts[this.chatToShow].visible = false;
                this.contacts[i].visible = true;
                this.chatToShow = i;
            }
        },
        sendOrReceiveMessage(sendMessage) {
            if (sendMessage && this.newMessage != '') {
                this.pushMessage('sent');
                setTimeout(this.sendOrReceiveMessage, 5000);
            } else if(!sendMessage) {
                this.newMessage = 'Ok';
                this.pushMessage('received');
            }
        },
        pushMessage(messageType) {
            this.newMessageDate = this.dateParsing(new Date(),this.dateOptions);
            this.contacts[this.chatToShow].messages.push({
                date: this.newMessageDate,
                message: this.newMessage,
                status: messageType
            });
            this.newMessage = '';
            this.newMessageDate = null;
        },
        deleteMessage(i){
            this.contacts[this.chatToShow].messages.splice(i,1);
        },
        dateParsing(date,options) {
            date = date.toLocaleTimeString('it-IT', options);
            return date;
        },
        dateFormat(formatType) {
            switch (formatType) {
                case 'full':
                    this.dateOptions = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                    break;
                case 'hour-minute':
                    this.dateOptions = {
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                    break;
            }
        },
        initialDateParsing() {
           for (let i = 0; i < this.contacts.length; i++) {
               for (let j = 0; j < this.contacts[i].messages.length; j++) {
                   let date = this.contacts[i].messages[j].date;
                   date = date.split("");
                   let day = [date[0], date[1]];
                   let month = [date[3], date[4]];
                   date[3] = day[0];
                   date[4] = day[1];
                   date[0] = month[0];
                   date[1] = month[1];
                   date = date.join("");
                   date = this.dateParsing(new Date(date),this.dateOptions);
                   this.contacts[i].messages[j].date = date;
               }
           }
        },
        contactsCopy(){
            this.originalContacts = this.contacts;
        },
        chatFilter() {
            if (this.chatToShow!=null) {
                this.contacts[this.chatToShow].visible = false;
                this.chatToShow= null;
            }

            this.contacts =  this.originalContacts;
            
            this.contacts = this.contacts.filter((contact) => contact.name.toLowerCase().includes(this.searchField.toLowerCase()));

        }
    }
}).mount('#app');
