<template>
    <div class="modal fade" id="newsPreview" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="previews-mobi mx-5">
                        <div class="previews-header">
                            <div class="back">
                                <ArrowLeftIcon />
                            </div>
                            <div class="widget-title m-auto">
                                Tin mới
                            </div>
                        </div>
                        <div class="previews-content auto-scroll-y">
                            <div class="avatar mb-3">
                                <img src="~~/assets/images/avatar-default.jpg" alt="">
                            </div>
                            <div class="title mb-3 px-3">
                                {{ title ? title : newsDefault.title }}
                            </div>
                            <div class="info d-flex mb-3 px-3">
                                <div class="created-date">{{ getCreatedDate() }}</div>
                                <div class="reaction ms-auto">
                                    <HeartIcon />
                                </div>
                            </div>
                            <div class="news-content px-3">
                                {{ content ? content : newsDefault.content }}
                            </div>

                            <div class="my-3 px-3 text-medium fw-bold">
                                Bài viết liên quan
                            </div>

                            <div class="news-related mb-3">
                                <ul class="px-2">
                                    <li><NewsRelated class="mb-2 zoom-in" /></li>
                                    <li><NewsRelated class="mb-2 zoom-in" /></li>
                                    <li><NewsRelated class="mb-2 zoom-in" /></li>
                                    <li><NewsRelated class="mb-2 zoom-in" /></li>
                                    <li><NewsRelated class="mb-2 zoom-in" /></li>
                                </ul>
                            </div>

                            <div class="my-3 px-3 text-medium fw-bold">
                                Bình luận (1)
                            </div>
                            <div class="news-comment mx-3">
                                <Comment />
                            </div>
                        </div>
                        <div class="button-dialect m-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ArrowLeftIcon from '~~/assets/images/icons/ArrowLeftIcon.vue';
import NewsRelated from '~~/components/NewsRelated.vue';

// icon
import HeartIcon from '../assets/images/icons/HeartIcon.vue';


import { getNowDate } from '~~/constants/format-date';
import SquareIcon from '../assets/images/icons/SquareIcon.vue';
import BackIcon from '../assets/images/icons/BackIcon.vue';
import CircleIcon from '../assets/images/icons/CircleIcon.vue';
import Comment1 from './Comment.vue';

export default {
    components: {
    ArrowLeftIcon,
    HeartIcon,
    NewsRelated,
    SquareIcon,
    BackIcon,
    CircleIcon,
    Comment1
},
    props: [
        'news'
    ],
    data() {
        return {
            newsDefault: {
                title: 'Đây là tiêu đề của bài viết sẽ được hiển thị khi có dữ liệu.',
                content: `Chiều 9/8, áp thấp nhiệt đới ở phía đông bắc quần đảo Hoàng Sa đã mạnh lên thành bão, khả năng vào Đông Bắc Bộ, gây mưa trong ba ngày.
                            Trung tâm Dự báo Khí tượng Thủy văn quốc gia cho biết, cơn bão thứ hai ở Biển Đông được đặt tên là Mulan. Lúc 13h, tâm bão cách đảo Hải Nam (Trung Quốc) khoảng 300 km, sức gió mạnh nhất 74 km/h, cấp 8, giật cấp 10. Bán kính gió mạnh cấp 6, giật cấp 8 khoảng 110 km tính từ tâm bão.
                            Chiều tối nay, bão theo hướng bắc sau đó đổi sang tây bắc, tốc độ 15-20 km/h. Đến 13h ngày 10/8, tâm bão sát bán đảo Lôi Châu (Trung Quốc), sức gió cấp 8, giật tăng hai cấp.
                            Sau đó, bão Mulan quặt hướng tây tây bắc với tốc độ 15 km/h và suy yếu thành áp thấp nhiệt đới ở trên khu vực đông bắc của Bắc Bộ. Đến 13h ngày 11/8, áp thấp nhiệt đới giảm còn cấp 6-7.
                            Đài khí tượng Nhật Bản dự báo bão vòng lên phía bắc đảo Hải Nam (Trung Quốc) với sức gió 65 km/h rồi giữ nguyên cường độ đi vào vịnh Bắc Bộ, sau đó suy yếu. Đài Hong Kong nhận định hướng đi tương tự, dự báo bão vào hai tỉnh Quảng Ninh và Lạng Sơn với sức gió 75 km/h.
                            Vùng nguy hiểm trên Biển Đông trong 24 giờ tới (gió mạnh cấp 6, giật từ cấp 8 trở lên) từ phía bắc vĩ tuyến 15,5; từ kinh tuyến 110,5 đến 114,5. Bắc Biển Đông (gồm vùng biển quần đảo Hoàng Sa) có gió mạnh cấp 6-7, vùng gần tâm bão mạnh cấp 8, sóng biển cao 4-6 m.
                            Vịnh Bắc Bộ (gồm cả huyện đảo Cô Tô, Bạch Long Vĩ) từ tối và đêm 10/8 gió mạnh dần từ cấp 6 đến cấp 8, giật tăng hai cấp, sóng biển cao 2-4 m.
                            Từ chiều tối 10/8 đến ngày 12/8, Bắc Bộ, Thanh Hóa và Nghệ An mưa 100-200 mm, có nơi trên 250 mm.
                            Sáng 9/8, Ban Chỉ đạo quốc gia về Phòng chống thiên tai đã có công điện yêu cầu các tỉnh ven biển từ Quảng Ninh đến Khánh Hòa theo dõi diễn biến bão, kiểm đếm tàu thuyền; thực hiện các biện pháp bảo đảm an toàn cho người và tài sản đối với tàu vận tải, hoạt động du lịch.
                            Từ đầu năm đến nay có một cơn bão và một áp thấp nhiệt đới trên Biển Đông. Dự báo cả năm có 10-12 cơn bão và áp thấp nhiệt đới ở khu vực này, trong đó khoảng 4-6 cơn ảnh hưởng trực tiếp đến đất liền Việt Nam.`,

            }
        }
    },
    setup(props) {
        const { avatar, title, createdDate, content } = props;

    

        function getCreatedDate() {
            if (createdDate) {
                return createdDate;
            }
            return getNowDate();
        }

        return {
            avatar,
            title,
            createdDate,
            content,

            getCreatedDate
        }
    }
}
</script>
<style lang="scss">

</style>