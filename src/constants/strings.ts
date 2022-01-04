let lang = 'kr';

export default {
    ARE_YOU_SURE(){
        if(lang == 'kr'){
            return '정말 진행하시겠습니까?';
        }
        return 'Are you sure?';
    },
    UPDATE_CONFIRMATION(){
        if(lang == 'kr'){
            return '되돌릴 수 없는 진행사항입니다.<br />정말 진행하시겠습니까?';
        }
        return 'This action cannot be undone.<br />Are you sure you want to update this record?';
    },
    YES(){
        if(lang == 'kr'){
            return '예';
        }
        return 'Yes';
    },
    NO(){
        if(lang == 'kr'){
            return '아니요';
        }
        return 'No';
    },
    ASSIGNED_VOLUNTEER(){
        if(lang == 'kr'){
            return '지원자 연결';
        }
        return 'Assigned Volunteer';
    },
    ASSIGNED_SUPPORT_AGENT(){
        if(lang == 'kr'){
            return '지원기관 연결';
        }
        return 'Assigned Support Agent';
    },
    EMPTY_STATE_ASSIGNED_VOLUNTEER(){
        if(lang == 'kr'){
            return '지원자가 연결되지 않았습니다. 연결을 진행해주세요';
        }
        return 'No volunteer assigned. Please assign one now.';
    },
    EMPTY_STATE_ASSIGNED_SUPPORT_AGENT(){
        if(lang == 'kr'){
            return '지원기관이 연결되지 않았습니다. 연결을 진행해주세요';
        }
        return 'No support agent  assigned. Please assign one now.';
    },
    REASSIGN(){
        if(lang == 'kr'){
            return '다시연결';
        }
        return 'Reassign';
    },
    EDIT(){
        if(lang == 'kr'){
            return '수정';
        }
        return 'Edit';
    },
    SAVE(){
        if(lang == 'kr'){
            return '저장';
        }
        return 'Save';
    },
    ID(){
        if(lang == 'kr'){
            return '아이디';
        }
        return 'ID';
    },
    ALLOW_VIEWING_OF_USER_ACCOUNT(){
        if(lang == 'kr'){
            return '계좌정보 공개 여부';
        }
        return 'Allow Viewing of User’s Account';
    },
    RELATION_TO_USER(){
        if(lang == 'kr'){
            return '관계'
        }
        return 'Relations to User';
    },
    PHONE_NUMBER(){
        if(lang == 'kr'){
            return '연락처'
        }
        return "Phone Number"
    },
    NAME(){
        if(lang == 'kr'){
            return '성명'
        }
        return "Name"
    },
    USERNAME(){
        if(lang == 'kr'){
            return '이용자 순'
        }
        return "Username"
    },
    LATEST(){
        if(lang == 'kr'){
            return '새로운 순'
        }
        return "Latest"
    },
    JOB_TITLE(){
        if(lang == 'kr'){
            return "역할"
        }
        return "Job Title"
    },
    USER(){
        if(lang == 'kr'){
            return "회원"
        }
        return "User"
    },
    SUPPORT_AGENCY(){
        if(lang == 'kr'){
            return "지원기관"
        }
        return "Support Agency"
    },
    VOLUNTEER(){
        if(lang == 'kr'){
            return "지원자"
        }
        return "Volunteer"
    },
    USER_LIST(){
        if(lang == 'kr'){
            return "회원 리스트"
        }
        return "User List"
    },
    SORT_BY(){
        if(lang == 'kr'){
            return "정렬"
        }
        return "Sort by "
    },
    UNTERMINATE(){
        if(lang == 'kr'){
            return "활성화"
        }
        return "Unterminate"
    },
    TERMINATE(){
        if(lang == 'kr'){
            return "삭제"
        }
        return "Terminate"
    },
    ALL(){
        if(lang == 'kr'){
            return "전체"
        }
        return "All"
    },
    GRANT_REQUEST_LIST(){
        if(lang == 'kr'){
            return "교부요청 리스트"
        }
        return "Grant Request List"
    },
    DETAILS(){
        if(lang == 'kr'){
            return "상세보기"
        }
        return "Details"
    },
    REQUEST_DATE(){
        if(lang == 'kr'){
            return "요청일자"
        }
        return "Request Date"
    },
    STATUS(){
        if(lang == 'kr'){
            return "상태"
        }
        return "Status"
    },
    REQUEST_REASON(){
        if(lang == 'kr'){
            return "요청 내용"
        }
        return "Request Reason"
    },
    BANK_NAME(){
        if(lang == 'kr'){
            return "은행 이름"
        }
        return "Bank Name"
    },
    ACCOUNT_NAME(){
        if(lang == 'kr'){
            return "계좌 명"
        }
        return "Account Name"
    },
    ACCOUNT_NUMBER(){
        if(lang == 'kr'){
            return "계좌번호"
        }
        return "Account Number"
    },
    REQUESTER(){
        if(lang == 'kr'){
            return "요청한 사람"
        }
        return "Requester"
    },
    PROOF_IMAGES(){
        if(lang == 'kr'){
            return "사진, 영수증"
        }
        return "Proof Images"
    },
    REJECT_REASON(){
        if(lang == 'kr'){
            return "비동의 사유를"
        }
        return "Reject Reason"
    },
    REJECT_REQUEST(){
        if(lang == 'kr'){
            return "거절"
        }
        return "Reject Request"
    },
    YOUR_REASON_HERE(){
        if(lang == 'kr'){
            return "이유를 적어주세요"
        }
        return "Your Reason Here"
    },
    UPDATE(){
        if(lang == 'kr'){
            return "변경"
        }
        return "Update"
    },
    GRANT_USER_DETAIL(){
        if(lang == 'kr'){
            return "요청 상세보기"
        }
        return "Grant User Detail"
    },
    GRANT_REQUEST_DETAIL(){
        if(lang == 'kr'){
            return "교부요청 상세"
        }
        return "Grant Request Detail"
    },
    NO_FILE_SELECTED(){
        if(lang == 'kr'){
            return "첨부파일이 등록되지 않음"
        }
        return "No File Selected"
    },
    USER_HAS_BEEN_SUCESSFULLY_REGISTERED(){
        if(lang == 'kr'){
            return "유저가 정상적으로 등록되었습니다"
        }
        return "User has been successfully registered"
    },
    PLEASE_INPUT_DOCUMENT_REQUIRED(){
        if(lang == 'kr'){
            return "사용자 정보를 추가 등록하시겠습니까?"
        }
        return "Please input documents required"
    },
    PLAN(){
        if(lang == 'kr'){
            return "계획서"
        }
        return "Plan"
    },
    CONTRACT(){
        if(lang == 'kr'){
            return "계약서"
        }
        return "Contract"
    },
    USER_AGREEMENT(){
        if(lang == 'kr'){
            return "이용약관"
        }
        return "User Agreement"
    },
    NO_PLAN_UPLOADED(){
        if(lang == 'kr'){
            return "계획서가 등록되지 않았어요"
        }
        return "No Plan Uploaded"
    },
    NO_CONTRACT_UPLOADED(){
        if(lang == 'kr'){
            return "계약서가 등록되지 않았어요"
        }
        return "No contract uploaded"
    },
    NO_AGREEMENT_UPLOADED(){
        if(lang == 'kr'){
            return "이용약관이 등록되지 않았어요"
        }
        return "No Agreement uploaded "
    },
    MAX_USER(){
        if(lang == 'kr'){
            return "최대 이용자"
        }
        return "Max. User"
    },
    MIN_USER(){
        if(lang == 'kr'){
            return "최소 이용자"
        }
        return "Min. User"
    },
    DELETE(){
        if(lang == 'kr'){
            return "삭제"
        }
        return "Delete"
    },
    CONTRACT_PERIOD_START(){
        if(lang == 'kr'){
            return "계약 시작일"
        }
        return "Contract Period Start"
    },
    CONTRACT_PERIOD_END(){
        if(lang == 'kr'){
            return "계약 종료일"
        }
        return "Contract Period End"
    }
}