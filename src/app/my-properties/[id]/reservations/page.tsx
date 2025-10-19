import DetailPage from "@/components/DetailPage"
import { DetailPageProps } from "@/types/DetailPage";

const ReservationsHotelPage = async ({ params }: DetailPageProps) => {
    const { id } = await params; 
    
    return (
        <DetailPage
            title="teste"
            previousPage="/my-properties"
            additionalLink={`/my-properties/${id}/edit`}
            additionalLinkText="Edit hotel"
            asideContainer={{
                title: 'teste',
                children: <div>teste</div>
            }}
        >
            teste
        </DetailPage>
    )
}

export default ReservationsHotelPage;