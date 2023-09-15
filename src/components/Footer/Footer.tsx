const Footer = () => {
  return (
    <div className='bg-neutral-100 py-8'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-1 text-sm text-black/40'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='col-span-2 text-sm text-black/40'>
            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
        <div className='mt-8 flex flex-col gap-1 text-center text-sm text-black/40'>
          <p>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
          <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
