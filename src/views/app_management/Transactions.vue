<template>
    <app-manage-tab-layout :activeItem="'transactions'">
        <div class="mt-5">
            <custom-alert v-if="(message)" :isSuccess="isSuccess" :message="message"/>
            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-12 text-center">
                            <div v-if="!isFileUploading">
                                <label for="push_link" class="form-label bold" style="cursor: pointer;">
                                    <div class="btn btn-primary d-flex py-2">
                                        <span class="text-white bold me-3">사용내역 업로드</span>
                                        <img class="my-auto" src="../../assets/img/ui/ic_upload.svg" alt="">
                                    </div>
                                </label>
                                <input id="push_link" type="file" ref="image" class="d-none form-control" @change="didFileSelected"/>
                            </div>
                            <load-widget v-else></load-widget>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr>
                                <th scope="col" class="bold">일시</th>
                                <th scope="col" class="bold">파일명</th>
                                <th scope="col" class="bold">상세보기</th>
                            </tr>
                        </thead>
                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="3" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <tbody v-else>
                            <tr v-for="filePath in transFilePaths" :key="filePath">
                                <td class="align-middle bold">{{ formatDate(filePath.date) }}</td>
                                <td class="align-middle">{{ filePath.path.split('/').pop() }}</td>
                                <td class="align-middle">
                                    <a class="btn btn-primary text-white" :href="$store.state.baseUrl + filePath.path">
                                        다운로드
                                    </a>
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
    import Pagination from "../../components/Pagination.vue"
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import AppManageTabLayout from "../../components/AppManageTab/AppManageTabLayout.vue"

    export default {
        data() {
            return {
                isSuccess: false,
                message: '',
                currentPage: 1,
                limit: 10,
                isFileUploading: false,
                isDataLoaded: false,
            }
        },
        components: {
            'app-manage-tab-layout': AppManageTabLayout,
            'pagination': Pagination,
            'shimmer-cell': ShimmerCell,
        },
        computed: {
            transFilePaths() {
                return this.$store.getters['transactions/transFilePaths'];
            },
            isUploadSuccess() {
                return this.$store.getters['transactions/isUploadSuccess'];
            },
            response() {
                return this.$store.getters['transactions/response'];
            },
            totalValue() {
                return this.$store.getters['transactions/totalValue'];
            },
        },
        watch: {
            transFilePaths(){
                this.isDataLoaded = true;
            },
            isUploadSuccess(){
                this.isSuccess = true;

                if (this.isUploadSuccess){
                    this.currentPage = 1;

                    this.isFileUploading = false;
                    this.isDataLoaded = false;
                    this.setupData();
                }
            },
            response() {
                this.isSuccess = this.response.success;
                this.message = this.response.message;

                if(!this.isSuccess){
                    this.isFileUploading = false;
                }
            },
        },
        methods: {
            setupData(){
                this.$store.dispatch('transactions/getAllTransactionFile', {
                    'page': this.currentPage,
                    'limit': this.limit,
                });
            },
            formatDate(dateString) {
                return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
            },
            movePage(page) {
                this.currentPage = page;
                 this.isDataLoaded = false;

                this.setupData();
            },
            didFileSelected(){
                const formData = new FormData();
                formData.append('file', this.$refs.image.files[0])
                this.$store.dispatch('transactions/uploadTransaction', formData);

                this.isFileUploading = true;
            }
        },
        created() {
            this.setupData();
        }
    }
</script>