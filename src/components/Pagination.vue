<template>
    <nav aria-label="Page navigation example" style="height:35px">
        <ul class="pagination justify-content-end">
            <!-- BACK BUTTON -->
            <li class="page-item mx-2">
                <a href="#" @click="(currentPage > 1) ? callback(currentPage - 1) : null">
                    <div class="page-link rounded-circle" href="#">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z" fill="#023366" />
                        </svg>
                    </div>
                </a>
            </li>
            <!-- END BACK BUTTON -->

            <!-- TOTAL PAGE < 6 -->
            <ul class="pagination px-3" style="background:white; border-radius: 17.5px" v-if="totalPage <= 1">
                <li class="d-flex page-item active">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(1)">
                        1
                    </a>
                </li>
            </ul>
            <!-- END TOTAL PAGE < 6 -->
            
            <!-- TOTAL PAGE < 6 -->
            <ul class="pagination px-3" style="background:white; border-radius: 17.5px" v-else-if="totalPage < 6">
                <li v-for="page in totalPage" :key="page" class="d-flex page-item" :class="(page == currentPage) ? 'active' : ''">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(page)">
                        {{page}}
                    </a>
                </li>
            </ul>
            <!-- END TOTAL PAGE < 6 -->

            <!-- TOTAL PAGE < 6 && CURRENT PAGE < 5 -->
            <ul class="pagination px-3" style="background:white; border-radius: 17.5px" v-else-if="totalPage >= 6 && currentPage < 4">
                <li v-for="page in 4" :key="page" class="d-flex page-item" :class="(page == currentPage) ? 'active' : ''">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(page)">
                        {{page}}
                    </a>
                </li>

                <li class="d-flex page-item">
                    <span class="my-auto" style="padding-bottom:2px;line-height:1;">
                        ...
                    </span>
                </li>

                <li class="d-flex page-item">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(totalPage)">
                        {{totalPage}}
                    </a>
                </li>
            </ul>
            <!-- TOTAL PAGE < 6 && CURRENT PAGE < 5 -->

            <!-- TOTAL PAGE < 6 && CURRENT PAGE < TOTAL PAGE - 3 -->
            <ul class="pagination px-3" style="background:white; border-radius: 17.5px" v-else-if="totalPage >= 6 && currentPage > totalPage-3">
                <li class="d-flex page-item">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(1)">
                        1
                    </a>
                </li>

                <li class="d-flex page-item">
                    <span class="my-auto" style="padding-bottom:2px;line-height:1;">
                        ...
                    </span>
                </li>

                <li v-for="page in range(totalPage - 3, totalPage)" :key="page" class="d-flex page-item" :class="(page == currentPage) ? 'active' : ''">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(page)">
                        {{page}}
                    </a>
                </li>
            </ul>
            <!-- TOTAL PAGE < 6 && CURRENT PAGE > TOTAL PAGE - 3 -->

            <!-- TOTAL PAGE < 6 && CURRENT PAGE > 4 -->
            <ul class="pagination px-3" style="background:white; border-radius: 17.5px" v-else>
                <li class="d-flex page-item">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(1)">
                        1
                    </a>
                </li>

                <li class="d-flex page-item">
                    <span class="my-auto" style="padding-bottom:2px;line-height:1;">
                        ...
                    </span>
                </li>

                <li v-for="page in range(currentPage - 1, currentPage + 1)" :key="page" class="d-flex page-item" :class="(page == currentPage) ? 'active' : ''">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(page)">
                        {{page}}
                    </a>
                </li>

                <li class="d-flex page-item">
                    <span class="my-auto" style="padding-bottom:2px;line-height:1;">
                        ...
                    </span>
                </li>

                <li class="d-flex page-item">
                    <a class="page-link page-start py-0 px-2 my-auto mx-1" style="height:24px; border-radius: 12px" href="#" @click="callback(totalPage)">
                        {{totalPage}}
                    </a>
                </li>
            </ul>
            <!-- TOTAL PAGE < 6 && CURRENT PAGE < 5 -->

            <!-- NEXT BUTTON -->
            <li class="page-item mx-2">
                <a href="#" @click="(currentPage < totalPage) ? callback(currentPage + 1) : null">
                    <div class="page-link rounded-circle" href="#">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M-8.7738e-05 10.59L1.40991 12L7.40991 6L1.40991 0L-8.7738e-05 1.41L4.57991 6L-8.7738e-05 10.59Z" fill="#023366" />
                        </svg>
                    </div>
                </a>
            </li>
             <!-- END NEXT BUTTON -->
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            totalPage: {
                type: Number,
                default: 1,
            },
            currentPage: {
                type: Number,
                default: 1,
            },
            callback: Function,
        },
        methods: {
            range: function (start, end) {
                return Array(end - start + 1).fill().map((_, idx) => start + idx)
            }
        }
    }
</script>