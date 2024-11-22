const PrintForm = ({ printFormArgs }) => {
    const { setFormData, pullFormData, formData, truncateString, handlename, name, supervisorPrint, email, handleemail,
        handlesupervisor, handlePartsUpload, partNames, handlePartNames, handleFileUpload, handleFilamentUsage, selectedPrinter,
        filamentUsage, files, notes, handlenotes, fillFormData, supervisor, handlefiles } = printFormArgs

    return (
        <div className='printForm'>
            <button onClick={(e) => formData ? setFormData(null) : pullFormData(e)} style={{ fontSize: 'small', marginBottom: '5px', cursor: 'pointer', }}>{formData ? "Clear Autofill Data Table" : "Retrieve Latest Five Form Submissions..."}</button>
            {formData && <div className="form-data-wrapper">
                <table className="form-data-table">
                    <thead>
                        <tr>
                            <th>Parts</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Supervisor</th>
                            <th>Notes</th>
                            <th>Files</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((job, index) => {
                            return <tr className={`history-row form-data-row`} onClick={() => { fillFormData(index) }} key={index}>
                                <td> {truncateString(job.partNames, 40)} </td>
                                <td> {truncateString(job.name, 20)} </td>
                                <td> {truncateString(job.email, 30)} </td>
                                <td> {truncateString(job.supervisorName, 20)} </td>
                                <td> {truncateString(job.notes, 128)} </td>
                                <td> {truncateString(job.files, 256)} </td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>}
            <div> Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input placeholder="Purdue Pete" value={name} onChange={handlename} style={{ width: '300px', 'fontSize': 'large' }}></input></div>
            <div className={`${supervisorPrint ? 'disabled' : 'enabled'}`}> Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input tabIndex={supervisorPrint ? -1 : undefined} placeholder="pete123@purdue.edu" value={email} onChange={handleemail} style={{ width: '300px', 'fontSize': 'large' }}></input></div>
            <div className={`supervisor-input ${supervisorPrint ? 'disabled' : 'enabled'}`}> Supervisor:&nbsp;&nbsp; <input tabIndex={supervisorPrint ? -1 : undefined} placeholder="Supervisor Name" value={supervisorPrint ? name : supervisor} onChange={handlesupervisor} style={{ width: '300px', 'fontSize': 'large' }}></input></div>
            <div className={`${supervisorPrint ? 'disabled' : 'enabled'}`}> Parts:&nbsp;
                <input type="file" multiple onChange={handlePartsUpload} style={{ display: 'none' }} id="parts-upload" />
                <button tabIndex="-1" className={`file-upload`} onClick={() => document.getElementById('parts-upload').click()} style={{ fontSize: 'small', marginRight: '2px', marginLeft: '4px' }}>browse...</button>
                <input tabIndex={supervisorPrint ? -1 : undefined} placeholder="part1, part2, part3" value={partNames} onChange={handlePartNames} style={{ width: '300px', 'fontSize': 'large' }}></input></div>

            <div className={`${supervisorPrint ? 'disabled' : 'enabled'}`}> Files:&nbsp;&nbsp;
                <input type="file" multiple onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload" />
                <button tabIndex="-1" className={`file-upload`} onClick={() => document.getElementById('file-upload').click()} style={{ fontSize: 'small', marginRight: '2px', marginLeft: '4px' }}>browse...</button>
                <input tabIndex={supervisorPrint ? -1 : undefined} placeholder="(Optional) Google Drive links" value={files} onChange={handlefiles} style={{ width: '300px', 'fontSize': 'large' }}></input>
            </div>
            <div> Filament Usage: <input value={filamentUsage} placeholder="12.34" type="text" onChange={handleFilamentUsage} style={{ width: '50px', 'fontSize': 'large' }}></input> {(selectedPrinter.filamentType === 'Resin') ? 'ml' : 'g'}
                {(selectedPrinter.filamentType !== 'PLA') && (` → $${(Math.round(filamentUsage) * (selectedPrinter.filamentType === 'Resin' ? 0.15 : 0.1)).toFixed(2)}`)} </div>

            <div style={{ marginTop: '10px' }}> -- Notes (Optional) --
                <br />
                <textarea value={notes} type="text" onChange={handlenotes} style={{ width: '400px', height: '60px', fontSize: 'large', resize: 'none' }}></textarea></div>
        </div>

    )
}
export default PrintForm;