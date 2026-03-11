import fastf1 as f1


session = f1.get_session(2026,1,'Q')
session.load(telemetry=True)
print(session.name)
print(session.date)

print(session)
