import './Member.css';

function Member({ curMember }) {
    return (
        <div className="member">
            <h3>{curMember["Member ID"]}</h3>
            <h3>{curMember["name"]}</h3>
            <p>{curMember["occupation"]}</p>
        </div>
    );
}

export default Member;