from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account


SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SAMPLE_SPREADSHEET_ID = "1B49bnFTer3x93YredNAQ5qt18vqIxkgY6pPWsU36D3Q"
SAMPLE_RANGE_NAME = 'A1:B2'


service_account_json = "Portfolio/UnrealEngine/Tools/Scripts/service_account.json"
cred_json = "Portfolio/UnrealEngine/Tools/Scripts/credentials.json"

creds = None
if not creds or not creds.valid:
    
    creds = service_account.Credentials.from_service_account_file(service_account_json, scopes=SCOPES)
    # flow = InstalledAppFlow.from_client_secrets_file(cred_json, SCOPES)
    # creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    if creds.expired:
        creds.refresh(Request())
# try:
service = build('sheets', 'v4', credentials=creds)

# Call the Sheets API
sheet = service.spreadsheets()
result = sheet.values().get(
    spreadsheetId=SAMPLE_SPREADSHEET_ID,
    range=SAMPLE_RANGE_NAME
).execute()

values = result.get('values', [])
for v in sheet:
    print(v)
if not values:
    print('No data found.')
else:
    print('Name, Major:')
    for row in values:
        # Print columns A and E, which correspond to indices 0 and 4.
        print(row)
# except HttpError as err:
#     print(err)


# gc = gspread.service_account(service_account_json)

# wks = gc.open("DT_ItemData").sheet1

# print(wks.acell("A1:B2"))

# gc.openall()

# wks.get_values("A1:B2")