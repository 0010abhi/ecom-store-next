

export default function CategoryCardsList({ categories }: any) {
    return (<div style={{
        display: 'flex',
        flexDirection: 'row', gap: 20, flexWrap: 'wrap',
        justifyContent: 'center', height: '300px',
        alignItems: 'center'
    }}>
        {['Category 1', 'Category 2', 'Category 3', 'Category 4'].map((category: string) => <div key={category} style={{
            width: 200,
            height: 100,
            border: '1px solid #ccc',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'capitalize',
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
        }}>
            {category}
        </div>)}
    </div>);
}