<template>
    <transition name="route" appear>
        <div class="d-flex" style="overflow:hidden; background:white; border: 1px solid rgba(0, 0, 0, 0.125)">
            <div class="d-flex flex-column" style="width: 30%; ">
                <div class="p-3" style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                    <input class="form-control" type="text" placeholder="Search username..." v-model="usernameQuery" @input="onSearch">
                </div>
                <div class="dialog-container py-3" style="overflow-y: scroll;">
                    <div v-for="dialog in filteredDialogs" :key="dialog" :data-id="dialog.id" style="overflow-x:hidden;">
                        <button 
                        class="dialog-item-btn btn p-0 text-start w-100"
                        style="height: unset; line-height:1.5"
                        @click="didSelectDialog(dialog)">
                            <div class="dialog-item d-flex py-3 mx-3 px-3" :class="{active: dialog.id == selectedDialog.id}" style="border-radius: 6px;">
                                <img class="me-3" src="../../assets/img/ui/chat-icon.svg" style="width: 50px; height: 50px;border-radius: 25px;" />
                                <div class="my-auto" style="flex-grow: 2; overflow-x: hidden">
                                    <p style="font-size: 16px; color:black">{{ dialog.occupants.find(val => val.id != currentUser._id).name }}</p>
                                    <p class="text-muted" style="font-size: 14px; max-height: 1.5em; overflow: hidden; text-overflow: ellipsis; display: block;">{{ (dialog.messages.length > 0) ? dialog.messages[0].text : 'No Message' }}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" style="width: 70%;">
                <div class="d-flex w-100 px-3 py-4" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); z-index: 1">
                    <p class="my-auto flex-grow-1" style="font-size:17px">
                        {{ (selectedDialog != null) ? selectedDialog.occupants.find(val => val.id != currentUser._id).name : "-"}}
                    </p>
                </div>
                <div class="flex-grow-1" style="overflow-y:scroll;">
                    <div class="flex-shrink-1" v-if="dialogs.length > 0">
                        <div class="d-flex m-3" v-for="message in messages" :key="message">
                            <div v-if="message.type == 'text'" class="p-3 d-inline-block" :class="(message.sender_id != currentUser._id) ? 'ms-auto' : '' " style="background: #E4E6EA; border-radius: 6px; max-width: 65%">
                                <p>{{ message.text }}</p>
                            </div>

                            <div v-else-if="message.type == 'image'" class="p-3 d-inline-block" :class="(message.sender_id != currentUser._id) ? 'ms-auto' : '' " style="background: #E4E6EA; border-radius: 6px; max-width: 35%">
                                <a target="_blank" :href="message.text">
                                    <img class="w-100" :src="message.text" alt="">
                                </a>
                            </div>

                            <div v-else-if="message.type == 'file'" class="p-3 d-inline-block" :class="(message.sender_id != currentUser._id) ? 'ms-auto' : '' " style="background: #E4E6EA; border-radius: 6px;">                                
                                <a target="_blank" :href="message.text">
                                    <div class="d-flex">
                                        <icon-attachment class="me-2"/>
                                        <p class="bold">Open Attachment</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex p-3">
                    <input id="attachment" type="file" ref="attachment" @change="attachmentSelected()" hidden>
                    <input id="image" type="file" ref="image" @change="imageSelected()" hidden>

                    <button class="btn p-0 me-2" @click="sendFile()">
                        <icon-attachment class="my-auto" style="height: 35px; width: 35px;"/>
                    </button>
                    <button class="btn p-0 me-2" @click="sendImage()">
                        <img src="@/assets/img/ui/image-attachment-icon.png" class="my-auto" style="height: 28px; width: 28px;"/>
                    </button>
                    <input class="form-control mx-3" type="text" placeholder="Aa" v-model="message" style="background: #F0F2F5" v-on:keyup.enter="sendMessage">
                    <button class="btn p-0" @click="sendMessage">
                        <img class="my-auto" src="../../assets/img/ui/ic_send.svg" alt="" style="height: 35px; width: 35px;">
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import IconAttachment from "../../components/icons/IconAttachment.vue" 
    export default {
        components: {
            IconAttachment
        },
        data() {
            return {
                isActive: true,
                selectedDialog: null,
                message: null,
                usernameQuery: "",
                filteredDialogs: []
            }
        },
        computed: {
            selectedRoomId(){
                return this.$store.getters['messaging/selectedRoomId'];
            },

            currentUser() {
                return JSON.parse(localStorage.getItem('userDetail'));
            },

            messages() {
                return this.$store.getters['messaging/messages'];
            },

            dialogs() {  
                const dialogs = this.$store.getters['messaging/dialogs'];
                if (!this.selectedDialog){
                    this.selectedDialog = dialogs[0];
                }

                if(this.selectedRoomId != null){
                    for (const dialog of dialogs) {
                        if (dialog.id == this.selectedRoomId){
                             this.selectedDialog = dialog;
                        }
                    }
                }
                
                this.filterDialogs(dialogs);
                
                return dialogs;
            }
        },

        watch: {
            selectedRoomId(){
                for (const dialog of this.filteredDialogs) {
                    if (dialog.id == this.selectedRoomId){
                        this.selectedDialog = dialog;
                        this.scrollToDialog();
                    }
                }
                this.getAllMessage();
            },
            dialogs(){
                this.getAllMessage();
                this.$nextTick(() => {
                    this.scrollToDialog();
                })
            }
        },

        methods: {
            onSearch(){
                this.filterDialogs(this.dialogs);
            },

            filterDialogs(dialogs){
                let filteredDialogs = [];
                dialogs.forEach(dialog => {
                    dialog.occupants.forEach(occupant => {
                        if(occupant.id != this.currentUser._id && occupant.name.includes(this.usernameQuery)){
                            filteredDialogs.push(dialog)
                        }
                    });
                });
                this.filteredDialogs = filteredDialogs;
            },

            getAllMessage() {
                if (this.selectedDialog != null) {
                    this.$store.dispatch('messaging/getAllMessage', {
                        id: this.selectedDialog.id,
                    })
                }
            },

            sendMessage() {
                const recipient = this.selectedDialog.occupants.find(val => val.id != this.currentUser._id)
                this.$store.dispatch('messaging/createMessage', {
                    recipient_id: recipient.id,
                    message: this.message
                })
                this.message = null;
            },

            didSelectDialog(dialog) {
                this.selectedDialog = dialog;
                this.$store.dispatch('messaging/setSelectedroomId',{
                    roomId: null
                });
                this.getAllMessage();
            },
            
            scrollToDialog(){
                if (this.selectedDialog == null){return}
                
                const dialog = document.querySelector(`[data-id="${this.selectedDialog.id}"]`);
                if (dialog == null){return}
                
                const container = document.querySelector('.dialog-container');
                container.scrollTop = (dialog.offsetTop - container.offsetTop) - 16;
            },

            sendFile(){
                document.getElementById("attachment").click()
            },

            sendImage(){
                document.getElementById("image").click()
            },

            imageSelected(){
                const recipient = this.selectedDialog.occupants.find(val => val.id != this.currentUser._id)
                const image = this.$refs.image.files[0];
                const formData = new FormData();

                formData.append('recipient_id', recipient.id)
                formData.append('image', image);

                this.$store.dispatch('messaging/sendImageMessage', formData);
            },

            attachmentSelected(){
                const recipient = this.selectedDialog.occupants.find(val => val.id != this.currentUser._id)
                const attachment = this.$refs.attachment.files[0];
                const formData = new FormData();

                formData.append('recipient_id', recipient.id)
                formData.append('file', attachment);

                this.$store.dispatch('messaging/sendFileMessage', formData);
            }
        },

        beforeCreate(){
            this.$store.dispatch('messaging/getAllDialog');
        }
    }
</script>

<style lang="scss">
    .dialog-item {
        &.active {
            background: rgba(2, 51, 102, 0.1)
        }
    }
</style>