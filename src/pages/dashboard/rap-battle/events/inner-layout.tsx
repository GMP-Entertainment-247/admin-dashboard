import PageTitle from "../../../../components/shared/PageTitle";

const EventInnerLayout: React.FC<{
    children: React.ReactNode;
    title: string;
}> = ({ title, children }) => {
    return (
        <div className="space-y-5">
            <PageTitle as="h2" showBackButton>
                {title}
            </PageTitle>
            {children}
        </div>
    );
};

export default EventInnerLayout;
