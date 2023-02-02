<template>
  <div class="row product pt-5">
    <div class="col-1"></div>
    <div class="col-2">
      <div class="product__avatar">
        <img src="http://127.0.0.1:9000/uploads/xuc_xich_mavin.jpg" alt="" />
      </div>
    </div>
    <div class="col-3">
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.type') }}:</div>
        <div class="col-4 text-end">{{ product.type }}</div>
      </div>
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.producer') }}:</div>
        <div class="col-4 text-end">{{ product.producer }}</div>
      </div>
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.weight') }}:</div>
        <div class="col-4 text-end">{{ $n(product.weight) }}</div>
      </div>
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.cost') }}:</div>
        <div class="col-4 text-end">{{ displayProductPrice(product.cost) }}</div>
      </div>
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.sale') }}:</div>
        <div class="col-4 text-end">{{ displayProductPrice(product.sale) }}</div>
      </div>
      <div class="row mb-3">
        <div class="col-6 text-theme">{{ $t('label.product.inventory') }}:</div>
        <div class="col-4 text-end">{{ $n(product.inventory) }}</div>
      </div>
    </div>
    <div class="col-6 text-end pe-5">
      <button type="button" class="me-3 py-2 px-4 bgc-warning text-white text-uppercase border-unset rounded-10">{{ $t('label.button.edit') }}</button>
      <button type="button" class="me-3 py-2 px-4 bgc-warning text-white text-uppercase border-unset rounded-10">{{ $t('label.button.delete') }}</button>
    </div>
    <div class="col-12">
      <p class="text-theme mb-0">{{ $t('label.description') }}</p>
      <div class="description">
        <p>Họ chia sẻ, công việc ngày càng bấp bênh và dễ sơ sẩy, đặc biệt là với những gói thầu lớn. Để nắm chắc phần trúng, họ thường phải hạ thấp giá chào. Nhưng giá nguyên vật liệu từ sau Covid tăng hàng ngày, trong khi các dự án thường chậm triển khai, càng để lâu càng lỗ to.</p><p>Năm 2021, giá nhà đất bắt đầu tăng mạnh, nhiều phóng viên hỏi tôi về nguyên nhân gây sốt giá. Tôi vẫn luôn nghĩ nguyên nhân đầu tiên là đất nước ta đang ở năm đầu của kỳ quy hoạch, nhiều địa điểm đô thị hóa, công nghiệp hóa, phát triển hạ tầng được đặt ra; đặc biệt Chính phủ đã quyết định tăng cường đầu tư công cho hạ tầng giai đoạn này. Đây là những tín hiệu tích cực kéo giá nhà đất lên cao hơn.</p><p>Tư duy về quản lý đầu tư công cũng có nhiều điểm khác biệt. Khi đất nước ở giai đoạn đầu Đổi Mới, Việt Nam chỉ có Luật Đầu tư kèm theo một số nghị định quy định về sử dụng ngân sách nhà nước cho đầu tư. Mãi đến năm 2014, Quốc hội mới ban hành Luật Đầu tư công đầu tiên. Khi đó có đại biểu Quốc hội còn nói với tôi rằng một Luật Đầu tư là đủ, vẽ thêm Luật Đầu tư công làm gì.</p><p>Điều này cho thấy, trước đây, tư duy về quản lý nguồn lực thuộc khu vực công ít được chú trọng, do thói quen làm việc từ thời bao cấp chưa dễ thay đổi. Trong thời kỳ này, thuật ngữ "chạy dự án" được sử dụng phổ biến, tức là cố tìm mọi cách để được phê duyệt một dự án đầu tư công, từ đó dễ chi tiêu ngân sách nhà nước, dễ hơn nhiều so với bỏ tiền từ túi riêng ra đầu tư kinh doanh thu lợi.</p><p>Các nước công nghiệp phát triển tổ chức quản lý nguồn lực công rất chặt chẽ. Ngân sách công, đầu tư công, nhà đất công đều có luật riêng, quản lý chi tiết hơn so với quản lý cũng những nguồn lực đó nhưng đã chuyển sang khu vực tư. Việt Nam mãi tới khoảng 2015 mới đẩy nhanh việc xây dựng pháp luật riêng cho quản lý nguồn lực công nhằm tiết kiệm và hiệu quả, như thường thấy ở các nước công nghiệp.</p><p>Trong khi Luật Đầu tư 2020 chỉ có 77 Điều, Luật Đầu tư công thứ hai, năm 2019, có tới 101 Điều, dù đã chuyển nhiều nội dung sang Luật Đầu tư theo phương thức đối tác công - tư 2020. Nói như vậy để thấy, các nhà lập pháp đã quen dần với pháp luật quản lý công, nhưng về thực thi, các nhà hành pháp chưa thích nghi với sự chặt chẽ trong quản lý nguồn lực công.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import {
  SYMBOL_ENUM
} from '~~/constants/symbol.enum';

const { n } = useI18n();

const props = defineProps({
  product: Object
})

const displayProductPrice = (price) => (price ? n(price) : "0").concat(SYMBOL_ENUM.SPACE).concat(SYMBOL_ENUM.DONG_SIGN);

</script>
<style lang="scss" scoped>
.product__avatar {
  width: 200px;
  height: 200px;
  img {
    width: inherit;
    display: block;
    object-fit: cover;
    margin-left: -30px;
  }
}
</style>