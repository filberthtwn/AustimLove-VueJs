<template>
    <app-manage-tab-layout :activeItem="'popup-manager'">
        <div>
            <custom-loading :isShow="isSubmit"/>
            <base-modal :isShow="isModalShow">
                <div class="overflow-auto" v-if="!showConfirmation">
                    <form enctype="multipart/form-data" v-on:submit.prevent="createAnnouncement">
                        <div class="container-fluid">
                            <div class="row mb-5">
                                <div class="col-2">
                                    &nbsp;
                                </div>
                                <div class="col-8">
                                    <h1 class="text-center mb-0">{{ (!popup) ? "팝업 생성" : "팝업 상세" }}</h1>
                                </div>
                                <div class="col-2 d-flex">
                                    <button class="btn my-auto ms-auto p-0" type="button" style="line-height:0rem; width: 21px; height: 21px;"  @click="toggleModal()">
                                        <img src="@/assets/img/ui/ic_times.svg" alt="">
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-grid gap-4">
                                        <div v-if="(popup != null)">
                                            <label for="title" class="form-label bold">가입일자</label>
                                            <input 
                                            id="title" 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="e.g. Easter Promo" 
                                            name="title" 
                                            :value="(popup) ? popup.createdAt : ''" disabled />
                                        </div>
                                        <div>
                                            <label for="title" class="form-label bold">제목</label>
                                            <input 
                                            id="title" 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="e.g. Easter Promo" 
                                            name="title"
                                            v-model="title"/>
                                        </div>
                                        <div>
                                            <label for="title" class="form-label bold">
                                            링크
                                            </label>
                                            <input 
                                            id="title" 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="e.g. Easter Promo" 
                                            name="title" 
                                            v-model="link"/>
                                        </div>

                                        <div v-if="popup != null && popup.imageUrl">
                                            <button class="btn text-primary bold p-0" style="height: unset" @click="toggleImageModal()">
                                                <icon-attachment class="my-auto me-2"/>
                                                <u>첨부 파일을 참조</u>
                                            </button>
                                        </div>

                                        <div v-else>
                                            <p class="form-label bold mb-3">이미지 (선택사항)</p>
                                            <label for="push_link" class="form-label bold" style="cursor: pointer;">
                                                <div class="d-flex gap-3">
                                                    <div class="btn btn-primary">
                                                        이미지 선택
                                                    </div>
                                                    <p class="my-auto">{{ (selectedImage) ? selectedImage.name : $strings.NO_FILE_SELECTED() }}</p>
                                                </div>
                                            </label>
                                            <input id="push_link" type="file" ref="image" class="d-none form-control" @change="selectImage"/>
                                        </div>

                                        <div>
                                            <label for="title" class="form-label bold d-block">팝업 표기 상태</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" style="height:35px; width: 70px;" :checked="(popup) ? popup.isShow : false" v-model="isShow">
                                            </div>
                                        </div>
                                        <div>
                                            <button class="btn btn-primary w-100" v-if="(!popup)" @click="createAction">
                                                등록
                                            </button>
                                            <div class="d-flex gap-4" v-else>
                                                <button class="btn btn-danger flex-grow-1" @click="deletePopup(popup)">삭제</button>
                                                <button class="btn btn-primary flex-grow-1" @click="toggleConfirmation()">저장</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- UPDATE CONFIRMATION CONTAINER -->
                <div id="confirmation-d" v-else>
                    <div class="d-flex flex-column p-3" v-if="!isLoading">
                        <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
                        <div class="d-flex mx-auto gap-3">
                            <button class="btn btn-outline-primary" style="width: 150px" @click="toggleConfirmation()">
                                {{ $strings.NO() }}
                            </button>
                            <button class="btn btn-primary" style="width: 150px" @click="updatePopup()">
                                {{ $strings.YES() }}
                            </button>
                        </div>
                    </div>
                    <load-widget :loading="true"  :size="'72px'" v-else/>
                </div>
            </base-modal>

            <!-- IMAGE MODAL -->
            <base-modal :isShow="true" v-if="isAttachmentModalShow">
                <div class="d-flex flex-column">
                    <img class="mx-auto mb-4" 
                    :src="$store.state.baseUrl  + popup.imageUrl" 
                    alt="" 
                    style="height: 350px; width: 350px;">

                    <button class="btn btn-primary mx-auto" 
                    type="button" 
                    style="width: 150px" 
                    @click="toggleImageModal()">

                    Close
                </button>
                </div>
            </base-modal>
            <!-- END IMAGE MODAL -->
            
            <!-- ALERT COMPONENT -->
            <custom-alert class="mt-4" v-if="(response)" :isSuccess="response.success" :message="response.message"/>

            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-12 d-flex">
                            <button class="btn btn-outline-primary py-1 px-4 ms-auto" @click="toggleModal()"
                            @mouseover="createButtonMouseOver" @mouseout="createButtonMouseOut">
                                <div class="d-flex">
                                    <span class="bold me-2 my-auto">신규 등록</span>
                                    <icon-popup class="my-auto" :color="iconColor" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr>
                                <th scope="col" class="bold">&nbsp;</th>
                                <th scope="col" class="bold">가입일자</th>
                                <th scope="col" class="bold">제목</th>
                                <th scope="col" class="bold">상태</th>
                                <th scope="col" class="bold">상세보기</th>
                            </tr>
                        </thead>
                        
                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="5" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <tbody v-else>
                            <tr v-for="popup in popups" :key="popup">
                                <td class="align-middle bold">
                                    <img class="my-auto" src="../../assets/img/ui/ic_draggable.svg" alt="">
                                </td>
                                <td class="align-middle">{{ formatDate(popup.createdAt) }}</td>
                                <td class="align-middle">{{ popup.title }}</td>
                                <td class="align-middle">{{ (popup.isShow) ? 'On' : 'Off' }}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary text-white" @click="toggleModal(popup)">
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <pagination :currentPage="currentPage" :totalPage="Math.ceil(totalValue/limit)" :callback="movePage" />
        </div>
    </app-manage-tab-layout>
</template>

<script>
    import moment from 'moment';
    import AppManageTabLayout from "../../components/AppManageTab/AppManageTabLayout.vue"

    import CustomLoading from "../../components/Widgets/CustomLoading.vue";
    import Pagination from "../../components/Pagination.vue"
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import IconPopup from '../../components//icons/IconPopup.vue'
    import IconAttachment from '../../components//icons/IconAttachment.vue'

    export default {
        components: {
            'app-manage-tab-layout': AppManageTabLayout,
            'shimmer-cell': ShimmerCell,
            'pagination': Pagination,
            'custom-loading': CustomLoading,
            'icon-popup': IconPopup,
            'icon-attachment': IconAttachment,
        },
        data() {
            return {
                limit: 15,
                currentPage: 1,
                iconColor: '#023366',
                popup: null,
                title: null,
                link: null,
                isShow: false,
                createdAt: null,
                isModalShow: false,
                isAttachmentModalShow: false,
                selectedImage: null,
                showConfirmation: false,
            }
        },
        computed: {
            isSubmit() {
                return this.$store.getters['popups/isSubmit'];
            },

            popups() {
                return this.$store.getters['popups/popups'];
            },
            
            totalValue() {
                return this.$store.getters['popups/totalValue'];
            },

            isDataLoaded() {
                return this.$store.getters['popups/isDataLoaded'];
            },

            imageUrl(){
                return this.$store.getters['popups/imageUrl'];
            },

            response(){
                return this.$store.getters['popups/response'];
            }
        },

        watch: {
            isSubmit(){
                if (!this.isSubmit){
                    this.popup = null;
                    this.isModalShow = false
                    this.getAllPopup();
                }
            },

            imageUrl(){
                this.createPopup()
            },

            response() {
                this.showConfirmation = false;
            },
        },

        methods: {
            getAllPopup(){
                this.$store.dispatch('popups/getAllPopup', {
                    'page': this.currentPage,
                    'limit': this.limit,
                });
            },

            uploadPopupImage(formData){
                this.$store.dispatch('popups/getAllPopup', formData);
            },

            createAction(){
                if (this.$refs.image.files.length > 0 ){
                    const formData = new FormData();
                    formData.append('image', this.$refs.image.files[0])

                    this.$store.dispatch('popups/uploadPopupImage', formData);
                    return
                }
                this.createPopup();
            },

            createPopup(){
                let params = {
                    title: this.title,
                    link: this.link,
                }

                if (this.imageUrl != null){
                    params['image_url'] = this.imageUrl
                }

                this.$store.dispatch('popups/createPopup', params);
            },

            deletePopup(popup){
                this.$store.dispatch('popups/deletePopup', {
                    id: popup.id,
                });
            },

            toggleConfirmation(){
                this.showConfirmation = !this.showConfirmation;
            },

            updatePopup(){
                const popup = this.popup;
                this.$store.dispatch('popups/updatePopup', {
                    id: popup.id,
                    title: this.title,
                    link: this.link,
                    image_url: '',
                    is_show: this.isShow
                });
            },

            selectImage(){
                const formData = new FormData();
                formData.append('image', this.$refs.image.files[0])
                this.selectedImage = this.$refs.image.files[0];
            },

            formatDate(dateString) {
                return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
            },

            createButtonMouseOver() {
                this.iconColor = "#FFFFFF"
            },

            createButtonMouseOut() {
                this.iconColor = "#023366"
            },

            toggleModal(popup) {
                console.log(popup);
                if (popup != null) {
                    console.log(popup);
                    this.popup = popup;

                    //* Setup modal with selectedPopup value
                    this.createdAt = this.formatDate(popup.createdAt);
                    this.title = popup.title;
                    this.link = popup.link;
                } else {
                    console.log(popup);
                    this.popup = null;
                }
                this.isModalShow = !this.isModalShow;
            },

            toggleImageModal(){
                this.isAttachmentModalShow = !this.isAttachmentModalShow;
            },

            movePage(page) {
                this.currentPage = page;
                this.getAllPopup();
            },
        },

        created() {
            this.getAllPopup();
        },
    };
</script>

<style scoped>
    button span {
        font-family: NotoSansKR;
        /* color: #505d7c; */
    }
</style>