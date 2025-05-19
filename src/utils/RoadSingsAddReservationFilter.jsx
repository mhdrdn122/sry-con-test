import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import SearchInput from './super_admin/SearchInput'
import DateFilter from './super_admin/DateFilter'

const RoadSingsAddReservationFilter = ({ searchWord, setSearchWord, setStatus, status, city, endDate, setEndDate, setCity, startDate, setStartDate }) => {
    const theme = useTheme()
    return (


        <div
            style={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                direction: 'rtl',

            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        gridColumn: '1 / -1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                    }}
                >
                    <span
                        style={{
                            width: '4px',
                            height: '20px',
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '2px',
                        }}
                    ></span>
                    <span
                        style={{
                            fontWeight: '600',
                            color: theme.palette.text.primary,
                        }}
                    >
                        تصفية النتائج
                    </span>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <SearchInput
                        searchWord={searchWord}
                        setSearchWord={setSearchWord}
                        phrasePlaceHolder="ابحث..."
                    />
                </div>

                <FormControl
                    variant="outlined"
                    margin="dense"
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: theme.palette.background.default,
                        },
                        '& .MuiInputLabel-root': {
                            transform: 'translate(14px, -50%) scale(0.9)',
                            '&.MuiInputLabel-shrink': {
                                transform: 'translate(14px, -9px) scale(0.75)',
                            },
                        },
                    }}
                >
                    <InputLabel id="city-filter-label">المدينة</InputLabel>
                    <Select
                        labelId="city-filter-label"
                        id="city-filter"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        label="المدينة"
                        sx={{
                            height: '40px',
                            '& .MuiSelect-select': {
                                padding: '10px 14px',
                            },
                        }}
                    >
                        <MenuItem value="">الكل</MenuItem>
                        <MenuItem value="دمشق">دمشق</MenuItem>
                        <MenuItem value="حلب">حلب</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    variant="outlined"
                    margin="dense"
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: theme.palette.background.default,
                        },
                        '& .MuiInputLabel-root': {
                            transform: 'translate(14px, -50%) scale(0.9)',
                            '&.MuiInputLabel-shrink': {
                                transform: 'translate(14px, -9px) scale(0.75)',
                            },
                        },
                    }}
                >
                    <InputLabel id="status-filter-label">الحالة</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        id="status-filter"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="الحالة"
                        sx={{
                            height: '40px',
                            '& .MuiSelect-select': {
                                padding: '10px 14px',
                            },
                        }}
                    >
                        <MenuItem value="">الكل</MenuItem>
                        <MenuItem value="متاح">متاح</MenuItem>
                        <MenuItem value="محجوز">محجوز</MenuItem>
                    </Select>
                </FormControl>

                <div
                    style={{
                        gridColumn: '1 / -1',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <DateFilter
                        value={startDate}
                        setValue={setStartDate}
                        name="startDate"
                        label="تاريخ البداية"
                    />
                    <DateFilter
                        value={endDate}
                        setValue={setEndDate}
                        name="endDate"
                        label="تاريخ النهاية"
                    />
                </div>
            </div>
        </div>
    )
}

export default RoadSingsAddReservationFilter
