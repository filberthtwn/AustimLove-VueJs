<template>
    <div>
        <base-modal :isShow="showPopup">
            <div class="d-flex flex-column p-3" v-if="!isLoading">
                <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
                <div class="d-flex mx-auto gap-3">
                    <button class="btn btn-outline-primary" style="width: 150px" @click="closePopup">
                        {{ $strings.NO() }}
                    </button>
                    <button class="btn btn-primary" style="width: 150px" @click="updateUser()">
                        {{ $strings.YES() }}
                    </button>
                </div>
            </div>
            <load-widget :loading="true"  :size="'72px'" v-else/>
        </base-modal>

        <user-detail-layout :activeItem="'userinfo'" :isDataLoaded="isDataLoaded">
            <template v-slot:content="props">
                <div>
                    <div class="card user-info my-4">
                        <div class="card-body d-flex flex-column">
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <label for="idInp" class="form-label bold">아이디</label>
                                        <input type="text" class="form-control" placeholder="e.g. user@autismlove.com" name="idInp" :disabled="!isDataLoaded" :value="isDataLoaded ? user.email : ''" @input="user.email = $event.target.value" />
                                    </div>
                                    <div class="col">
                                        <label for="firstNameInp" class="form-label bold">성명</label>
                                        <input type="text" class="form-control" placeholder="Fusions User" name="firstNameInp" :disabled="!isDataLoaded" :value="isDataLoaded ? user.name : ''" @input="user.name = $event.target.value" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="birthDateInp" class="form-label bold">생년월일</label>
                                        <input type="date" class="form-control" placeholder="2021-01-01" name="birthDateInp" :disabled="!isDataLoaded" :value="isDataLoaded ? user.birthdate : ''" @input="user.birthdate = $event.target.value" />
                                    </div>
                                    <div class="col">
                                        <label for="phoneNumberInp" class="form-label bold">연락처</label>
                                        <input type="text" class="form-control" placeholder="e.g 08123456789" name="phoneNumberInp" :disabled="!isDataLoaded" :value="isDataLoaded ? user.phoneNumber : ''" @input="user.phoneNumber = $event.target.value" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="bank_name" class="form-label bold">은행 이름</label>
                                        <input class="form-control" placeholder="e.g. Citilink Bank" name="bank_name" :disabled="!isDataLoaded" :value="isDataLoaded ? user.bankName : ''" @input="user.bankName = $event.target.value" />
                                    </div>
                                    <div class="col">
                                        <label for="bank_account_number" class="form-label bold">계좌번호</label>
                                        <input type="text" class="form-control" placeholder="e.g. 123456789" name="bank_account_number" :disabled="!isDataLoaded" :value="isDataLoaded ? user.bankAccountNumber : ''" @input="user.bankAccountNumber = $event.target.value" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="volunteerInp" class="form-label bold">지원자</label>
                                        <input type="text" class="form-control" placeholder="-" name="volunteerInp" :value="user.volunteer.name" disabled />
                                    </div>
                                    <div class="col">
                                        <label for="supportAgencyInp" class="form-label bold">지원기관</label>
                                        <input type="text" class="form-control" placeholder="-" name="supportAgencyInp" :value="user.supportAgent.name" disabled />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="volunteerInp" class="form-label bold">신탁계좌 은행</label>
                                        <input type="text" class="form-control" placeholder="-" name="trust_bank_name" :disabled="props.isDisabled" :value="user.trust_bank_name" @input="user.trust_bank_name = $event.target.value" />
                                    </div>
                                    <div class="col">
                                        <label for="volunteerInp" class="form-label bold">신탁계좌번호</label>
                                        <input type="text" class="form-control" placeholder="-" name="trust_bank_account_number" :disabled="props.isDisabled" :value="user.trust_bank_account_number" @input="user.trust_bank_account_number = $event.target.value" />
                                    </div>
                                </div>
                            </form>
                            <div class="row mt-4" v-if="!isDataLoaded">
                                <!-- Plan -->
                                <div class="col-3 text-start align-middle" v-if="user.plan_file_path">
                                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z" fill="#023366" /></svg><a class="ms-1 bold"><span>서비스 이용계획서</span></a>
                                </div>
                                <div class="col-3 text-start align-middle" v-else>
                                    {{ $strings.NO_PLAN_UPLOADED() }}
                                </div>
                                <!-- End of Plan -->

                                <!-- Contract -->
                                <div class="col-3 text-start align-middle" v-if="user.contract_file_path">
                                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z" fill="#023366" /></svg><a class="ms-1 bold"><span>계약서</span></a>
                                </div>
                                <div class="col-3 text-start align-middle" v-else>
                                    {{ $strings.NO_CONTRACT_UPLOADED() }}
                                </div>
                                <!-- End of Contract -->

                                <!-- User Agreement -->
                                <div class="col-6 text-end align-middle" v-if="user.user_agreement_file_path">
                                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z" fill="#023366" />
                                    </svg>
                                    <a class="ms-1 bold"><span>개인정보 동의서</span></a>
                                </div>
                                <div class="col-6 text-end align-middle" v-else>
                                    {{ $strings.NO_AGREEMENT_UPLOADED() }}
                                </div>
                                <!-- End of User Agreement -->
                            </div>
                            <div class="row" v-else>
                                <div class="col-6 mb-3">
                                    <label class="form-label bold">{{ $strings.PLAN() }}</label>
                                    <div class="d-flex">
                                        <a class="file-label my-auto me-3" :href="`${$store.getters['baseUrl']}${user.plan_file_path}`" v-if="(user.plan_file_path && !selectedPlan)" target="_blank">{{ user.plan_file_path.split('/').slice(-1).pop() }}</a>
                                        <p class="my-auto me-3 file-label" v-else>{{ (selectedPlan) ? selectedPlan.name : $strings.NO_FILE_SELECTED() }}</p>
                                        <div class="ms-auto">
                                            <label for="input-plan" class="form-label bold m-0" style="cursor: pointer;">
                                                <div class="d-flex gap-3">
                                                    <div class="btn btn-primary ms-auto" style="min-width:115px;">
                                                        이미지 선택
                                                    </div>
                                                </div>
                                            </label>
                                            <input id="input-plan" type="file" ref="planFile" class="d-none form-control" @change="selectPlan" />
                                        </div>

                                        <!-- Remove Plan Button -->
                                        <button class="btn d-block p-0 my-auto ms-2" style="border: 1px solid black;" v-if="selectedPlan || user.plan_file_path" @click="removePlan()">
                                            <div class="d-flex" style=" height: 24px; width: 24px">
                                                <img class="m-auto" src="@/assets/img/ui/ic_times.svg" alt="" style="width: 12px; height: 12px">
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="volunteerInp" class="form-label bold">{{ $strings.CONTRACT() }}</label>
                                    <div class="d-flex">
                                        <a class="file-label my-auto me-3" :href="`${$store.getters['baseUrl']}${user.contract_file_path}`" v-if="(user.contract_file_path && !selectedContract)" target="_blank">{{ user.contract_file_path.split('/').slice(-1).pop() }}</a>
                                        <p class="my-auto me-3 file-label" v-else>{{ (selectedContract) ? selectedContract.name : $strings.NO_FILE_SELECTED() }}</p>
                                        <div class="ms-auto">
                                            <label for="input-contract" class="form-label bold m-0" style="cursor: pointer;">
                                                <div class="d-flex gap-3">
                                                    <div class="btn btn-primary ms-auto" style="min-width:115px;">
                                                        이미지 선택
                                                    </div>
                                                </div>
                                            </label>
                                            <input id="input-contract" type="file" ref="contractFile" class="d-none form-control" @change="selectContract" />
                                        </div>

                                        <!-- Remove Contract Button -->
                                        <button class="btn d-block p-0 my-auto ms-2" style="border: 1px solid black;" v-if="selectedContract || user.contract_file_path" @click="removeContract()">
                                            <div class="d-flex" style=" height: 24px; width: 24px">
                                                <img class="m-auto" src="@/assets/img/ui/ic_times.svg" alt="" style="width: 12px; height: 12px">
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label for="volunteerInp" class="form-label bold">{{ $strings.USER_AGREEMENT() }}</label>
                                    <div class="d-flex">
                                        <a class="file-label my-auto me-3" :href="`${$store.getters['baseUrl']}${user.user_agreement_file_path}`" v-if="(user.user_agreement_file_path && !selectedAgreement)" target="_blank">{{ user.user_agreement_file_path.split('/').slice(-1).pop() }}</a>
                                        <p class="my-auto me-3 file-label" v-else>{{ (selectedAgreement) ? selectedAgreement.name : $strings.NO_FILE_SELECTED() }}</p>
                                        <div class="d-flex ms-auto">
                                            <label for="input-agreement" class="form-label bold m-0" style="cursor: pointer;">
                                                <div class="d-flex gap-3">
                                                    <div class="btn btn-primary ms-auto" style="min-width:115px;">
                                                        이미지 선택
                                                    </div>
                                                </div>
                                            </label>
                                            <input id="input-agreement" type="file" ref="agreementFile" class="d-none form-control" @change="selectAgreement" />
                                        </div>

                                        <button class="btn d-block p-0 my-auto ms-2" style="border: 1px solid black;" v-if="selectedAgreement || user.user_agreement_file_path" @click="removeAgreement()">
                                            <div class="d-flex" style=" height: 24px; width: 24px">
                                                <img class="m-auto" src="@/assets/img/ui/ic_times.svg" alt="" style="width: 12px; height: 12px">
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" v-if="isDataLoaded">
                        <div class="d-flex ms-auto gap-4">
                            <!-- <p>{{ user.is_active }}</p> -->
                            <button type="button" class="btn text-white" :class="(user.is_active) ? 'btn-danger' : 'btn-success'" style="width: 150px" @click="terminateAction">
                                {{ (user.is_active) ? $strings.TERMINATE() : $strings.UNTERMINATE() }}
                            </button>

                            <button class="btn btn-primary" style="width: 150px" @click="saveAction">
                                {{ $strings.SAVE() }}
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </user-detail-layout>
    </div>
</template>
<script>
    import ClipLoader from "vue-spinner/src/ClipLoader.vue"
    import CustomLoading from "../../components/Widgets/CustomLoading.vue";
    import UserDetailLayout from "../../layouts/UserDetailLayout.vue";
    export default {
        components: {
            ClipLoader
        },
        props: ['id', 'isDisabled'],
        data() {
            return {
                showPopup:false,
                selectedPlan: null,
                selectedContract: null,
                selectedAgreement: null,
                contract_period_start: 'test',
                isLoading: false,
                isDataLoaded: false,
                disabled: true,
                selectedMethod: 'SAVE'
            }
        },

        components: {
            'user-detail-layout': UserDetailLayout,
            'custom-loading': CustomLoading,
            ClipLoader
        },

        computed: {
            planFilePath() {
                return this.$store.getters['users/planFilePath'];
            },

            isPlanUploaded() {
                return this.$store.getters['users/isPlanUploaded'];
            },

            contractFilePath() {
                return this.$store.getters['users/contractFilePath'];
            },

            isContractUploaded() {
                return this.$store.getters['users/isContractUploaded'];
            },

            agreementFilePath() {
                return this.$store.getters['users/agreementFilePath'];
            },

            isAgreementUploaded() {
                return this.$store.getters['users/isAgreementUploaded'];
            },

            user() {
                return this.$store.getters['users/user'];
            },

            successMsg() {
                return this.$store.getters['users/successMsg'];
            }
        },

        watch: {
            user(){
                if(this.user.name != "-"){
                    this.isDataLoaded = true;
                }
                this.selectedPlan = null;
                this.selectedContract = null;
                this.selectedAgreement = null;
            },

            successMsg() {
                if (this.successMsg != null) {
                    this.showPopup = false;
                    this.isLoading = false;
                    if (this.selectedMethod == 'SAVE'){
                        this.$store.dispatch('users/getUserDetail', {
                            'id': this.id,
                        });
                    }

                    if (this.selectedMethod == 'DELETE'){
                        this.$router.back();
                    }
                }
            },

            isPlanUploaded(){
                if (this.isPlanUploaded){
                    let formData = null;

                    if(this.planFilePath) {
                        this.user.plan_file_path = this.planFilePath;
                    }

                    if (this.selectedContract){
                        formData = new FormData();
                        formData.append('file', this.selectedContract ?? null);
                    }
                    this.$store.dispatch('users/uploadContract', formData);

                    /// Reset isPlanUploaded variable
                    this.$store.commit('users/setIsPlanUploaded', false);
                }
            },

            isContractUploaded(){
                if (this.isContractUploaded){
                    let formData = null;

                    if(this.contractFilePath) {
                        this.user.contract_file_path = this.contractFilePath;
                    }

                    if (this.selectedAgreement){
                        formData = new FormData();
                        formData.append('file', this.selectedAgreement ?? null);
                    }
                    this.$store.dispatch('users/uploadAgreement', formData);

                    /// Reset isContractUploaded variable
                    this.$store.commit('users/setIsContractUploaded', false);
                }
            },

            isAgreementUploaded(){
                console.log("AGREEMENT FILE");
                console.log(this.agreementFilePath);
                if (this.isAgreementUploaded){
                    if(this.agreementFilePath) {
                        this.user.user_agreement_file_path = this.agreementFilePath;
                    }

                    let params = {
                        'user_id': this.id,
                        'email': this.user.email,
                        'name': this.user.name,
                        'birthdate': this.user.birthdate,
                        'bank_name': this.user.bankName,
                        'bank_account_number': this.user.bankAccountNumber,
                        'trust_bank_name': this.user.trust_bank_name,
                        'trust_bank_account_number': this.user.trust_bank_account_number,
                        'plan_file_path': this.user.plan_file_path,
                        'contract_file_path': this.user.contract_file_path,
                        'user_agreement_file_path': this.user.user_agreement_file_path
                    };

                    this.$store.dispatch('users/updateUser', params);

                    /// Reset isAgreementUploaded variable
                    this.$store.commit('users/setIsAgreementUploaded', false);
                }
            },
        },

        created() {
            this.$store.dispatch('users/getUserDetail', {
                'id': this.id,
            });
        },

        methods: {
            selectPlan() {
                this.selectedPlan = this.$refs.planFile.files[0];
            },
            selectContract(){
                this.selectedContract = this.$refs.contractFile.files[0];
            },
            selectAgreement(){
                this.selectedAgreement = this.$refs.agreementFile.files[0];
            },
            terminateAction() {
                this.selectedMethod = "DELETE";

                this.isDataLoaded = false
                this.isLoading = true;
                
                if (this.user.is_active){
                    this.$store.dispatch('users/terminateUser', {
                        'user_id': this.id
                    });
                    return
                }

                this.$store.dispatch('users/unterminateUser', {
                        'user_id': this.id
                    });
            },
            saveAction() {
                this.showPopup = true;    
            },
            closePopup(){
                this.showPopup = false;    
            },
            updateUser(){
                this.selectedMethod = "SAVE";

                this.isDataLoaded = false
                this.isLoading = true;
                        
                let formData = null;
                if (this.selectedPlan){
                    formData = new FormData();
                    formData.append('file', this.selectedPlan);
                }
                this.$store.dispatch('users/uploadPlan', formData);
            },
            removePlan(){
                this.selectedPlan = null;
                this.user.plan_file_path = null;
            },
            removeContract(){
                this.selectedContract = null;
                this.user.contract_file_path = null;
            },
            removeAgreement(){
                this.selectedAgreement = null;
                this.user.user_agreement_file_path = null;
            }
        },
    }
</script>

<style scoped>
    .row {
        margin: 1rem;
    }

    .card.user-info a span {
        color: #023874;
        text-decoration: underline;
        cursor: pointer;
    }

    .file-label{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>