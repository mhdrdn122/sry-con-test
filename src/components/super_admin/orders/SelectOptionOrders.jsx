import { useTheme } from "@mui/material"


const SelectOptionOrders = ({selectedType , setSelectedType , selectedType2 , handleTypeChange}) => {
    const theme = useTheme()
    return (
        <div className='d-flex flex-wrap gap-3 mb-2' style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        }}>
            <div style={{
                flex: '1 1 200px',
                minWidth: '200px',
                maxWidth: '100%'
            }}>
                <label htmlFor="order-type" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                }}>
                    نوع الطلب
                </label>

                <select
                    id="order-type"
                    value={selectedType2}
                    onChange={handleTypeChange}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: theme.shadows[1],
                    }}
                >
                    <option value="">اختر نوع الطلب</option>
                    <option value="all">📋 تحميل الفك و التركيب</option>
                    <option value="installation">🔧 تحميل تركيب</option>
                    <option value="uninstallation">❌ تحميل فك</option>
                </select>
            </div>

            <div style={{
                flex: '1 1 200px',
                minWidth: '200px',
                maxWidth: '100%'
            }}>
                <label htmlFor="operation-type" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                }}>
                    نوع العملية
                </label>

                <select
                    id="operation-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: theme.shadows[1],
                    }}
                >
                    <option value="">فك و تركيب</option>
                    <option value="installation">تركيب</option>
                    <option value="uninstallation">فك</option>
                </select>
            </div>
        </div>
    )
}

export default SelectOptionOrders
